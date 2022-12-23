const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Venue, EventImage, Membership, Event, Attendance } = require('../../db/models');
const { Op } = require("sequelize");
const { urlencoded } = require('express');

const router = express.Router();

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
        .isLength({min:2, max:2})
        .withMessage("State is required"),
    check('lat')
        .isFloat({min:-90, max:90})
        .withMessage("Latitude is not valid"),
    check('lng')
        .isFloat({min:-180, max:180})
        .withMessage("Longitude is not valid"),
    handleValidationErrors
];
const err = {}




router.put('/:venueId', requireAuth, validateVenue, async (req, res, next) => {
    const { venueId } = req.params;
    const { user } = req
    const {address, city, state, lat, lng} = req.body
    const venue = await Venue.findByPk(venueId)

    if (venue) {
        const group = await Group.findByPk(venue.groupId)
        const isCohost = await Membership.findOne({ where: { groupId: group.id, userId: user.id, status: "co-host" } })
        if(isCohost || group.organizerId === user.id){
            const updatedVenue = await venue.update({
                groupId: group.id, address, city, state, lat, lng
            })
            return res.json({
                id:updatedVenue.id,
                groupId: group.id,
                address,
                city,
                state,
                lat,
                lng
            })
        } else{
            err.title = "Not Authorized"
            err.status = 403
            err.message = "Only the organizer or co-host may edit a venue"
            return next(err)
        }
    }else {
        err.title = "Can't find Venue"
        err.status = 404
        err.message = `Venue couldn't be found`
        return next(err)
    }

})












module.exports = router;
