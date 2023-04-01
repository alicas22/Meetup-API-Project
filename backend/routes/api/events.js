const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, EventImage, Venue, Membership, Event, Attendance } = require('../../db/models');
const { Op } = require("sequelize");
const { urlencoded } = require('express');

const router = express.Router();

const validateEvent = [
    check('venueId')
        // .exists({ checkFalsy: true })
        .custom(async value => {
            let venueExists = await Venue.findByPk(value)
            if (!venueExists) return Promise.reject()
        })
        .withMessage("Venue does not exist"),
    check('name')
        // .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage("Name must be at least 5 characters"),
    check('type')
        // .exists({ checkFalsy: true })
        .isIn(['Online', 'In person'])
        .withMessage(`Type must be 'Online' or 'In person'`),
    check('capacity')
        .isInt({ min: 1 })
        .withMessage('Capacity must be an integer'),
    check('price')
        .isFloat({ min: 0 })
        .withMessage("Price is invalid"),
    check('description')
        // .exists({ checkFalsy: true })
        .isLength({ min: 10 })
        .withMessage("Description is required"),
    check('startDate')
        .custom(async value => {
            if (Date.parse(value) < Date.now()) return Promise.reject()
        })
        .withMessage("Start date must be in the future"),
    check('endDate')
        .custom(async (value, { req }) => {
            if (Date.parse(value) < Date.parse(req.body.startDate)) return Promise.reject()
        })
        .withMessage("End date is less than start date"),
    handleValidationErrors
];

const validateQuery = [
    check('page')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage("Page must be greater than or equal to 1 and less than or equal to 10"),
    check('size')
        .optional()
        .isInt({ min: 1, max: 20 })
        .withMessage("Size must be greater than or equal to 1 and less than or equal to 20"),
    check('name')
        .optional()
        .isAlphanumeric('en-US',{ignore:" "})
        .withMessage("Name must be a string"),
    check('type')
        .optional()
        .isIn(['Online', 'In person'])
        .withMessage("Type must be 'Online' or 'In Person'"),
    check('startDate')
        .optional()
        .custom(async value => {
            const dateTime = new Date(value)

            if (isNaN(dateTime.getTime())) return Promise.reject()
        })
        .withMessage("Start date must be a valid datetime"),
    handleValidationErrors
];

const err = {}

router.post('/:eventId/attendance', requireAuth, async (req, res, next) => {
    const { eventId } = req.params;
    const { user } = req
    const event = await Event.findByPk(eventId)

    if (event) {
        const membership = await Membership.findOne({ where: { groupId: event.groupId, userId: user.id } })
        const attendance = await Attendance.findOne({ where: { eventId, userId: user.id } })

        if (!attendance && (membership.status === 'member' || membership.status === 'co-host')) {
            const newAttendance = await Attendance.create({
                eventId, userId: user.id, status: 'pending'
            })
            return res.json({ userId: user.id, status: newAttendance.status })
        } else if (!attendance && (membership.status !== 'member' && membership.status !== 'co-host')) {
            err.title = "Not a member"
            err.status = 400
            err.message = "Must be a member to request attendance to event"
            return next(err)
        } else if (attendance.status === "pending") {
            err.title = "Request Pending"
            err.status = 400
            err.message = "Attendance has already been requested"
            return next(err)
        } else if (attendance.status === "attending") {
            err.title = "Unnecessary Request"
            err.status = 400
            err.message = "User is already an attendee of the event"
            return next(err)
        }
    } else {
        err.title = "Can't find Event"
        err.status = 404
        err.message = `Event couldn't be found`
        return next(err)
    }


})


router.put('/:eventId/attendance', requireAuth, async (req, res, next) => {
    const { eventId } = req.params;
    const { user } = req
    const { userId, status } = req.body
    const event = await Event.findByPk(eventId)


    if (!event) {
        err.title = "Can't find Event"
        err.status = 404
        err.message = `Event couldn't be found`
        return next(err)
    }

    const currentMemberId = await User.findByPk(userId)
    const attendance = await Attendance.findOne({ where: { userId, eventId } })
    const areYouOrganizer = await Group.findOne({ where: { id: event.groupId, organizerId: user.id } })
    const areYouCohost = await Membership.findOne({ where: { groupId: event.groupId, userId: user.id, status: "co-host" } })

    if (!currentMemberId) {
        err.title = "Validations Error"
        err.status = 400
        err.message = "User couldn't be found"
        return next(err)
    }
    if (!attendance) {
        err.title = "Validations Error"
        err.status = 404
        err.message = "Membership between the user and the group does not exist"
        return next(err)
    }
    if (status === 'pending') {
        err.title = "Validations Error"
        err.status = 400
        err.message = "Cannot change a membership status to pending"
        return next(err)
    }

    if ((areYouOrganizer || areYouCohost) && (status === 'attending' || status === 'not attending')) {
        await attendance.update({ status: "attending" })
        return res.json({
            id: attendance.id,
            eventId: event.id,
            userId: userId,
            status: "attending"
        })
    } else if ((!areYouOrganizer && !areYouCohost) && status === 'attending') {
        err.title = "Not Authorized"
        err.status = 403
        err.message = `Not authorized to make that change`
        return next(err)
    } else if ((areYouOrganizer || areYouCohost) && status === 'not attending') {
        await attendance.update({ status: "not attending" })
        return res.json({
            id: attendance.id,
            eventId: event.id,
            userId: userId,
            status: "not attending"
        })
    }

})

router.post('/:eventId/images', requireAuth, async (req, res, next) => {
    const { eventId } = req.params
    const { user } = req
    const { url, preview } = req.body
    const event = await Event.findByPk(eventId)

    if (event) {
        const isAttending = await Attendance.findOne({ where: { eventId: eventId, status: ['attending'] } });
        const isOrganizer = await Group.findOne({ where: { id: event.groupId, organizerId: user.id } })
        const isCohost = await Membership.findOne({ where: { userId: user.id, groupId: event.groupId, status: 'co-host' } })
        if (!isAttending && !isOrganizer && !isCohost) { //make sure authorized to delete
            err.title = "Not authorized"
            err.status = 401
            err.message = `Must be attendee, organizer, or co-host to add image`
            return next(err)
        }
        const newImage = await EventImage.create({ // create image
            eventId: event.id, url, preview
        })
        newImage.toJSON()
        return res.json({ // return correct properties
            id: newImage.id, url: newImage.url, preview: newImage.preview
        })
    } else {
        err.title = "Not found"
        err.status = 404
        err.message = "Group couldn't be found"
        return next(err)
    }

})




router.delete('/:eventId/attendance', requireAuth, async (req, res, next) => {

    const { eventId } = req.params
    const { user } = req
    const { userId } = req.body
    const event = await Event.findByPk(eventId)

    if (event) {
        const isOrganizer = await Group.findOne({ where: { id: event.groupId, organizerId: user.id } })
        const isCohost = await Membership.findOne({ where: { groupId: event.groupId, status: 'co-host' } })
        const attendance = await Attendance.findOne({ where: { eventId, userId } })

        if (!attendance) {
            err.title = "Can't find Attendance"
            err.status = 404
            err.message = "Attendance does not exist for this User"
            return next(err)
        }

        if (attendance && (isCohost || isOrganizer || attendance.userId === user.id)) {
            attendance.destroy()
            return res.json({ message: "Successfully deleted attendance from event" })
        } else if (attendance && (!isCohost && !isOrganizer && attendance.userId !== user.id)) {
            err.title = "Not Authorized"
            err.status = 403
            err.message = "Only the User, organizer, or co-host may delete an Attendance"
            return next(err)
        }
    } else {
        err.title = "Can't find Event"
        err.status = 404
        err.message = `Event couldn't be found`
        return next(err)
    }
})

router.get('/:eventId/attendees', restoreUser, async (req, res, next) => {
    const { eventId } = req.params;
    const { user } = req
    const allAttendees = [];
    const attendanceArr = []
    const event = await Event.findByPk(eventId)


    if (event) { //query based on if organizer or co-host
        const group = await Group.findByPk(event.groupId)
        const areYouCohost = await Membership.findOne({ where: { groupId: group.id, userId: user.id, status: 'co-host' } })
        let attendees;

        if (group.organizerId === user.id || areYouCohost) {
            attendees = await Attendance.findAll({ where: { eventId } })
        } else {
            attendees = await Attendance.findAll({ where: { eventId: eventId, status: 'attending' } })
        }

        attendees.forEach(attendance => {
            attendanceArr.push(attendance.toJSON())
        })

        for (let i = 0; i < attendanceArr.length; i++) {
            const attendance = attendanceArr[i]
            let user = await User.findByPk(attendance.userId, {
                attributes: ['id', 'firstName', 'lastName'],
                include: {
                    model: Attendance,
                    attributes: ['status']
                }
            })
            user = user.toJSON()
            user.Attendance = user.Attendances[0]
            delete user.Attendances
            allAttendees.push(user)
        }
        res.json({ Attendees: allAttendees })
    } else {
        err.title = "Can't find Event"
        err.status = 404
        err.message = `Event couldn't be found`
        return next(err)
    }


})


router.get('/:eventId', async (req, res, next) => {
    const { eventId } = req.params;

    let event = await Event.findByPk(eventId, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
            {
                model: Group,
                attributes: ['id', 'name', 'private', 'city', 'state']
            },
            {
                model: Venue,
                attributes: ['id', 'address', 'city', 'state', 'lat', 'lng']
            },
            {
                model: EventImage,
                attributes: ['id', 'url', 'preview']
            }
        ]
    });
    console.log(eventId)
    if (event) {
        const numAttending = await Attendance.count({ where: { eventId, status: 'attending' } })

        event = event.toJSON();
        event.numAttending = numAttending
        return res.json(event)
    } else {
        err.title = "Can't find Event"
        err.status = 404
        err.message = `Event couldn't be found`
        return next(err)
    }

})


router.delete('/:eventId', requireAuth, async (req, res, next) => {
    const { eventId } = req.params;
    const { user } = req
    const deleteEvent = await Event.findByPk(eventId);

    if (deleteEvent) {
        const group = await Group.findByPk(deleteEvent.groupId)
        const cohost = await Membership.findOne({ where: { groupId: group.id, status: 'co-host' } })
        if (group.organizerId !== user.id) { //check if organizer
            err.title = "Not authorized"
            err.status = 401
            err.message = `Must be organizer or co-host to delete image`
            return next(err)
        }
        if (cohost) {
            if (cohost.groupId !== group.id) { //check if not co-host
                err.title = "Not authorized"
                err.status = 401
                err.message = `Must be organizer or co-host to delete image`
                return next(err)
            }
        }
        await deleteEvent.destroy();
        res.status(200);
        return res.json({ message: "Successfully deleted" })
    } else {
        err.title = "Can't find Event"
        err.status = 404
        err.message = `Event couldn't be found`
        return next(err)
    }
})


router.put('/:eventId', requireAuth, validateEvent, async (req, res, next) => {

    const { eventId } = req.params
    const { user } = req
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body

    const event = await Event.findByPk(eventId)
    if (event) {
        const group = await Group.findByPk(event.groupId)
        const cohost = await Membership.findOne({ where: { groupId: group.id, status: 'co-host' } })
        if (group.organizerId != user.id) { //check if organizer
            err.title = "Not authorized"
            err.status = 401
            err.message = `Must be organizer to delete group`
            return next(err)
        }
        if (cohost) {
            if (cohost.groupId !== group.id) { //check if co-host
                err.title = "Not authorized"
                err.status = 401
                err.message = `Must be organizer or co-host to delete image`
                return next(err)
            }
        }
        const newEvent = await event.update({
            venueId, name, type, capacity, price, description, startDate, endDate
        })
        return res.json({
            id: newEvent.id,
            groupId: group.id,
            venueId,
            name,
            type,
            capacity,
            price,
            description,
            startDate,
            endDate
        })

    } else {
        err.title = "Can't find Event"
        err.status = 404
        err.message = `Event couldn't be found`
        return next(err)
    }


})

//fix date
router.get('/', validateQuery, async (req, res, next) => {
    let { page, size, name, type, startDate } = req.query
    const allEvents = []

    page = page ? +page : 1;
    size = size ? +size : 20;
    const pagination = {}
    pagination.limit = size;
    pagination.offset = ((page - 1) * size)

    const where = {}
    if(name) where.name = name;
    if(type) where.type = type;
    if(startDate)where.startDate = startDate

    const events = await Event.findAll({
        include: [{
            model: Group,
            attributes: ['id', 'name', 'city', 'state']
        },
        {
            model: Venue,
            attributes: ['id', 'city', 'state']
        }],
        attributes: { exclude: ['createdAt', 'updatedAt', 'description', 'capacity', 'price'] },
        ...pagination,
        where
    })

    //calculate numAttending and previewImage if available
    for (let i = 0; i < events.length; i++) {
        let event = events[i]
        const eventId = event.id
        const numAttending = await Attendance.count({ where: { eventId , status: 'attending'} })
        const previewImage = await EventImage.findOne({ where: { eventId, preview: true } })
        event = event.toJSON()
        event.numAttending = numAttending;

        if (previewImage) event.previewImage = previewImage.url
        else event.previewImage = "Preview not available"
        allEvents.push(event)
    }
    res.json({ Events: allEvents })
})

module.exports = router;
