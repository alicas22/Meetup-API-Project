const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, GroupImage, Venue, Membership,Event } = require('../../db/models');

const router = express.Router();
const err = {}

router.get('/', async (req, res, next)=>{
    const events = await Event.findAll({
        include:[Group, Venue]
    })
    res.json(events)
})

module.exports = router;
