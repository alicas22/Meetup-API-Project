const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, EventImage, Event, Membership } = require('../../db/models');

const router = express.Router();
const err = {}

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;
    const { user } = req
    const deleteImage = await EventImage.findByPk(imageId)

    if (deleteImage) {
        const event = await Event.findByPk(deleteImage.eventId)
        const group = await Group.findByPk(event.groupId)
        const cohost = await Membership.findOne({ where: { groupId: event.groupId, status: 'co-host' } })
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
        await deleteImage.destroy()
        res.status(200)
       return res.json({ message: "Successfully Deleted" })
    } else {
        err.title = "Can't find Image"
        err.status = 404
        err.message = "Group Image couldn't be found"
        return next(err)
    }
})




module.exports = router;
