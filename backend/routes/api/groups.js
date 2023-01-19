// backend/routes/api/session.js
const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, GroupImage, Venue, Membership, Event, Attendance, EventImage } = require('../../db/models');
const { Op } = require("sequelize")

const router = express.Router();

const validateCreation = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 60 })
        .withMessage('Name must be 60 characters or less'),
    check('about')
        .exists({ checkFalsy: true })
        .isLength({ min: 50 })
        .withMessage('About must be 50 characters or more'),
    check('type')
        .exists({ checkFalsy: true })
        .isIn(['Online', 'In person'])
        .withMessage(`Type must be 'Online' or 'In person'`),
    check('private')
        .isBoolean()
        .withMessage('Private must be a boolean'),
    check('city')
        .isLength({ min: 2 })
        .withMessage('City is required'),
    check('state')
        .isLength({ min: 2 })
        .withMessage('State is required'),
    handleValidationErrors
];

const validateEvent = [
    check('venueId')
        .exists({ checkFalsy: true })
        .custom(async value => {
            let venueExists = await Venue.findByPk(value)
            if (!venueExists) return Promise.reject()
        })
        .withMessage("Venue does not exist"),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage("Name must be at least 5 characters"),
    check('type')
        .exists({ checkFalsy: true })
        .isIn(['Online', 'In person'])
        .withMessage(`Type must be 'Online' or 'In person'`),
    check('capacity')
        .isInt({ min: 1 })
        .withMessage('Capacity must be an integer'),
    check('price')
        .isFloat({ min: 0 })
        .withMessage("Price is invalid"),
    check('description')
        .exists({ checkFalsy: true })
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

const validateVenue = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 10 })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 2, max: 2 })
        .withMessage("State is required"),
    check('lat')
        .isFloat({ min: -90, max: 90 })
        .withMessage("Latitude is not valid"),
    check('lng')
        .isFloat({ min: -180, max: 180 })
        .withMessage("Longitude is not valid"),
    handleValidationErrors
];
const err = {}


router.put('/:groupId/membership', requireAuth, async (req, res, next) => {
    const { groupId } = req.params;
    const { user } = req
    const { memberId, status } = req.body
    const group = await Group.findByPk(groupId)
    const currentMemberId = await User.findByPk(memberId)
    const membership = await Membership.findOne({ where: { groupId, userId: memberId } })
    const areYouOrganizer = await Group.findOne({ where: { id: groupId, organizerId: user.id } })
    const areYouCohost = await Membership.findOne({ where: { groupId, userId: user.id, status: "co-host" } })


    if (!group) {
        err.title = "Can't find Group"
        err.status = 404
        err.message = `Group couldn't be found`
        return next(err)
    }
    if (!currentMemberId) {
        err.title = "Validations Error"
        err.status = 400
        err.message = "User couldn't be found"
        return next(err)
    }
    if (!membership) {
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

    if ((areYouOrganizer || areYouCohost) && status === 'member') {
        await membership.update({ status: "member" })
        return res.json({
            id: membership.id,
            groupId: group.id,
            memberId: memberId,
            status: "member"
        })
    } else if ((!areYouOrganizer && !areYouCohost) && status === 'member') {
        err.title = "Not Authorized"
        err.status = 403
        err.message = `Not authorized to make that change`
        return next(err)
    }
    if ((areYouOrganizer) && status === 'co-host') {
        await membership.update({ status: "co-host" })
        return res.json({
            id: membership.id,
            groupId: group.id,
            memberId: memberId,
            status: "co-host"
        })
    } if ((!areYouOrganizer) && status === 'co-host') {
        await membership.update({ status: "co-host" })
        err.title = "Not Authorized"
        err.status = 403
        err.message = `Not authorized to make that change`
        return next(err)
    }
})



router.post('/:groupId/venues', requireAuth, validateVenue, async (req, res, next) => {
    const { groupId } = req.params;
    const { user } = req
    const { address, city, state, lat, lng } = req.body
    const group = await Group.findByPk(groupId)
    const isCohost = await Membership.findOne({ where: { groupId, userId: user.id, status: "co-host" } })
    const venue = await Venue.findOne({ where: { groupId } })

    if (group) {
        if (isCohost || group.organizerId === user.id) {
            const newVenue = await Venue.create({
                groupId: group.id, address, city, state, lat, lng
            })
            return res.json({
                id: newVenue.id,
                groupId: group.id,
                address,
                city,
                state,
                lat,
                lng
            })
        } else {
            err.title = "Not Authorized"
            err.status = 403
            err.message = "Only the organizer or co-host may create a venue"
            return next(err)
        }
    } else {
        err.title = "Can't find Group"
        err.status = 404
        err.message = `Group couldn't be found`
        return next(err)
    }

})


router.post('/:groupId/membership', requireAuth, async (req, res, next) => {
    const { groupId } = req.params;
    const { user } = req
    const group = await Group.findByPk(groupId)
    const membership = await Membership.findOne({ where: { groupId, userId: user.id } })

    if (group) {
        if (!membership) {
            const newMembership = await Membership.create({
                userId: user.id, groupId, status: 'pending'
            })
            return res.json({ memberId: user.id, status: newMembership.status })
        } else if (membership.status === 'member' || membership.status === 'co-host') {
            err.title = "Already a member"
            err.status = 400
            err.message = "User is already a member of the group"
            return next(err)
        } else if (membership.status === "pending") {
            err.title = "Request Pending"
            err.status = 400
            err.message = "Membership has already been requested"
            return next(err)
        }
    } else {
        err.title = "Can't find Group"
        err.status = 404
        err.message = `Group couldn't be found`
        return next(err)
    }


})

router.delete('/:groupId/membership', requireAuth, async (req, res, next) => {
    const { groupId } = req.params
    const { user } = req
    const { memberId } = req.body
    const group = await Group.findByPk(groupId)

    if (group) {
        const isOrganizer = await Group.findOne({ where: { id: groupId, organizerId: user.id } })
        const isCohost = await Membership.findOne({ where: { groupId: groupId, status: 'co-host' } })
        const membership = await Membership.findOne({ where: { groupId, userId: memberId } })

        if (!membership) {
            err.title = "Can't find Membership"
            err.status = 404
            err.message = "Membership does not exist for this User"
            return next(err)
        }

        if (membership && (isCohost || isOrganizer || membership.userId === user.id)) {
            membership.destroy()
            return res.json({ message: "Successfully deleted membership from group" })
        } else if (membership && (!isCohost && !isOrganizer && membership.userId !== user.id)) {
            err.title = "Not Authorized"
            err.status = 403
            err.message = "Only the User, organizer, or co-host may delete a Membership"
            return next(err)
        }
    } else {
        err.title = "Can't find Group"
        err.status = 404
        err.message = `Group couldn't be found`
        return next(err)
    }
})

router.get('/:groupId/members', restoreUser, async (req, res, next) => {
    const { groupId } = req.params
    const { user } = req
    const allMembers = []
    const membersArr = []
    const group = await Group.findByPk(groupId)
    const areYouCohost = await Membership.findOne({ where: { groupId: groupId, userId: user.id, status: 'co-host' } })
    let members;

    if (group) { //query based on if organizer or co-host
        if (group.organizerId === user.id || areYouCohost) {
            members = await Membership.findAll({ where: { groupId } })
        } else {
            members = await Membership.findAll({ where: { groupId: groupId, status: { [Op.or]: ['co-host', 'member'] } } })
        }

        members.forEach(member => {
            membersArr.push(member.toJSON())
        })

        for (let i = 0; i < membersArr.length; i++) {
            const member = membersArr[i]
            let user = await User.findByPk(member.userId, {
                attributes: ['id', 'firstName', 'lastName'],
                include: {
                    model: Membership,
                    attributes: ['status']
                }
            })
            user = user.toJSON()
            user.Membership = user.Memberships[0]
            delete user.Memberships
            allMembers.push(user)
        }

        res.json({ Members: allMembers })
    } else {
        err.title = "Can't find Group"
        err.status = 404
        err.message = `Group couldn't be found`
        return next(err)
    }
})


router.get('/:groupId/venues', requireAuth, async (req, res, next) => {
    const { groupId } = req.params
    const { user } = req
    const allVenues = []

    const venues = await Venue.findAll({
        where: { groupId },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    if (venues.length) {
        for (let i = 0; i < venues.length; i++) {
            const venue = venues[i]
            const group = await Group.findByPk(venue.groupId)
            const cohost = await Membership.findOne({ where: { groupId: group.id, status: 'co-host' } })
            if (group.organizerId !== user.id) { //check if organizer
                err.title = "Not authorized"
                err.status = 401
                err.message = `Must be organizer or co-host to to get Venues`
                return next(err)
            }
            if (cohost) {
                if (cohost.groupId !== group.id) { //check if not co-host
                    err.title = "Not authorized"
                    err.status = 401
                    err.message = `Must be organizer or co-host to get Venues`
                    return next(err)
                }
            }
            allVenues.push(venue)
        }
        res.json({ Venues: allVenues })
    } else {
        err.title = "Can't find Group"
        err.status = 404
        err.message = `Group couldn't be found`
        return next(err)
    }
})

router.get('/:groupId/events', async (req, res, next) => {
    const { groupId } = req.params
    const allEvents = []

    const events = await Event.findAll({
        attributes: { exclude: ['capacity', 'price', 'updatedAt', 'createdAt', 'description'] },
        where: { groupId },
        include: [{
            model: Group,
            attributes: ['id', 'name', 'city', 'state']
        },
        {
            model: Venue,
            attributes: ['id', 'city', 'state']
        }],
    })

    if (events.length) {
        //calculate numAttending and previewImage if available
        for (let i = 0; i < events.length; i++) {
            let event = events[i]
            const eventId = event.id
            const numAttending = await Attendance.count({ where: { eventId } })
            const previewImage = await EventImage.findOne({ where: { eventId, preview: true } })
            event = event.toJSON()
            event.numAttending = numAttending;
            if (previewImage) event.previewImage = previewImage.url
            else event.previewImage = "Preview not available"
            allEvents.push(event)
        }
        return res.json({ Events: allEvents })
    } else {
        err.title = "Can't find Group"
        err.status = 404
        err.message = `Group couldn't be found`
        return next(err)
    }
})

router.post('/:groupId/images', requireAuth, async (req, res, next) => {
    const { groupId } = req.params
    const { user } = req;
    const { url, preview } = req.body;

    const group = await Group.findByPk(groupId)
    if (group) {
        if (group.organizerId != user.id) { //check if organizer
            err.title = "Not authorized"
            err.status = 401
            err.message = `Must be organizer to upload photo`
            return next(err)
        }
        const newImage = await GroupImage.create({
            groupId: groupId, url, preview
        })

        return res.json({
            id: newImage.id,
            url,
            preview
        })
    } else {
        err.title = "Can't find Group"
        err.status = 404
        err.message = `Group couldn't be found`
        return next(err)
    }
})

router.post('/:groupId/events', requireAuth, validateEvent, async (req, res, next) => {
    const { groupId } = req.params
    const { user } = req
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body

    const group = await Group.findByPk(groupId)
    if (group) {
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
        const newEvent = await Event.create({
            venueId, groupId: group.id, name, type, capacity, price, description, startDate, endDate
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
        err.title = "Can't find Group"
        err.status = 404
        err.message = `Group couldn't be found`
        return next(err)
    }
})


//needs WORK
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;
    const id = user.id
    const membershipsArr = []
    const groupArr = []
    let result = []
    const final = []

    const memberships = await Membership.findAll({ where: { userId: id }, attributes: [], include: Group })

    const organizedBy = await Group.findAll({ where: { organizerId: id } })

    memberships.forEach(membership => {  //lazy load memberships
        membershipsArr.push(membership.toJSON().Group)
    })
    organizedBy.forEach(group => {    //lazy load organized by
        groupArr.push(group.toJSON())
    })

    result = membershipsArr.concat(groupArr) //combine arrays

    //remove duplicates
    for (let i = result.length - 1; i > 0; i--) {
        for (let j = 0; j < result.length; j++) {
            if (result[i].id === result[j].id) result.splice(j, 1)
        }
    }


    for (let i = 0; i < result.length; i++) {
        let group = result[i]
        const groupId = group.id
        const numMembers = await Membership.count({ where: { groupId } })
        const previewImage = await GroupImage.findOne({ where: { groupId, preview: true } })

        group.numMembers = numMembers;
        if (previewImage) group.previewImage = previewImage.url
        else group.previewImage = "Preview not available"
        final.push(group)

    }


    res.json({ Groups: final })
})

//FIX DATE
router.get('/:groupId', requireAuth, async (req, res, next) => {
    const { groupId } = req.params

    const group = await Group.findByPk(groupId, {
        include: [
            {
                model: GroupImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User, as: "Organizer",
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Venue,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
        ]
    })
    if (group) {
        const numMembers = await Membership.count({ where: { groupId } })
        group.toJSON()
        group.numMembers = numMembers

        res.json({
            id: group.id,
            organizerId: group.organizerId,
            name: group.name,
            about: group.about,
            type: group.type,
            private: group.private,
            city: group.city,
            state: group.state,
            createdAt: group.createdAt,
            updatedAt: group.updatedAt,
            numMembers: group.numMembers,
            GroupImages: group.GroupImages,
            Organizer: group.Organizer,
            Venues: group.Venues
        })
    } else {
        err.title = "Not found"
        err.status = 404
        err.message = "Group couldn't be found"
        return next(err)
    }
})

router.delete('/:groupId', requireAuth, async (req, res, next) => {
    const { groupId } = req.params
    const { user } = req;
    const id = user.id
    const group = await Group.findByPk(groupId)

    if (group) {
        if (group.organizerId !== id) { //make sure authorized to delete
            err.title = "Not authorized"
            err.status = 401
            err.message = `Must be organizer to delete group`
            return next(err)
        }
        await group.destroy()
        res.status(200)
        return res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    } else {
        err.title = "Can't find Group"
        err.status = 404
        err.message = `Group couldn't be found`
        return next(err)


    }
})
router.put('/:groupId', requireAuth, validateCreation, async (req, res, next) => {
    const { name, about, type, private, city, state } = req.body
    const { groupId } = req.params
    const { user } = req;
    const id = user.id

    const group = await Group.findByPk(groupId)

    if (group) {
        if (group.organizerId !== id) { //make sure authorized to edit
            err.title = "Not authorized"
            err.status = 401
            err.message = `Must be organizer to edit group`
            return next(err)
        }
        await group.update({
            organizerId: id, name, about, type, private, city, state
        })
        res.status(200)
        return res.json(group)
    } else {
        err.title = "Can't find Group"
        err.status = 404
        err.message = `Group couldn't be found`
        return next(err)
        // res.status(404)
        // res.json({
        //     message: "Group couldn't be found",
        //     statusCode: 404
        // })

    }


})
//NEED TO FIX DATE
router.get('/', async (req, res, next) => {
    const groups = await Group.findAll({})
    const allGroups = []

    //calculate numMembers and preview images if available
    for (let i = 0; i < groups.length; i++) {
        let group = groups[i]
        const groupId = group.id
        const numMembers = await Membership.count({ where: { groupId } })
        const previewImage = await GroupImage.findOne({ where: { groupId, preview: true } })
        group = group.toJSON()
        group.numMembers = numMembers;
        if (previewImage) group.previewImage = previewImage.url
        else group.previewImage = "Preview not available"
        allGroups.push(group)

    }


    res.json({ Groups: allGroups })
})


router.post('/', requireAuth, validateCreation, async (req, res, next) => {
    const { name, about, type, private, city, state } = req.body
    const { user } = req;
    const id = user.id
    const group = await Group.create({
        organizerId: id, name, about, type, private, city, state
    })

    res.json(group)
})

module.exports = router;
