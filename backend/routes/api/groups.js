// backend/routes/api/session.js
const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Group } = require('../../db/models');

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

const err = {}

//needs numMembers and preview image
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;
    const id = user.id

    const groups = await Group.findAll({ where: { organizerId: id } })

    res.json(groups)
})

//need images/relationships first
router.get('/:groupId', requireAuth, async (req, res, next) => {
    const { groupId } = req.params

    const group = Group.findByPk(groupId)
    res.json(group)
})

router.delete('/:groupId', restoreUser, requireAuth, async (req, res, next) => {
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
            message: 'Successfully deleted',
            statusCode: 200
        })
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
router.put('/:groupId', restoreUser, requireAuth, validateCreation, async (req, res, next) => {
    const { name, about, type, private, city, state } = req.body
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


router.post('/', requireAuth, restoreUser, validateCreation, async (req, res, next) => {
    const { name, about, type, private, city, state } = req.body
    const { user } = req;
    const id = user.id

    const group = await Group.create({
        organizerId: id, name, about, type, private, city, state
    })

    res.json(group)
})

module.exports = router;
