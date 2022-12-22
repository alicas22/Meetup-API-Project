// backend/routes/api/session.js
const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie,  requireAuth } = require('../../utils/auth');
const { User, Group, GroupImage, Venue, Membership } = require('../../db/models');

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

router.post('/:groupId/images', requireAuth, async (req, res, next)=>{
    const {groupId} = req.params
    const {user} = req
    const {url, preview} = req.body
    const group = await Group.findByPk(groupId)
    if(group){
        if (group.organizerId !== user.id) { //make sure authorized to delete
            err.title = "Not authorized"
            err.status = 401
            err.message = `Must be organizer to delete group`
            return next(err)
        }
        const newImage =await GroupImage.create({ // create image
            groupId, url, preview
        })
        newImage.toJSON()
        return res.json({ // return correct properties
            id: newImage.id, url:newImage.url, preview:newImage.preview
        })
    } else{
        err.title = "Not found"
        err.status = 404
        err.message = "Group couldn't be found"
        return next(err)
    }

})
//needs WORK
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;
    const id = user.id
    const membershipsArr =  []
    const groupArr = []
    let result = []
    const final = []

    const memberships = await Membership.findAll({ where: { userId: id }, attributes: [], include: Group })

    const organizedBy = await Group.findAll({where: {organizerId:id}})

    memberships.forEach(membership =>{  //lazy load memberships
        membershipsArr.push(membership.toJSON().Group)
    })
    organizedBy.forEach(group =>{    //lazy load organized by
        groupArr.push(group.toJSON())
    })

    result = membershipsArr.concat(groupArr) //combine arrays

    //remove duplicates
    for(let i=result.length -1; i > 0; i--){
        for(let j = 0; j < result.length; j++){
            if(result[i].id === result [j].id) result.splice(j,1)
        }
    }

    //calculate numMembers and preview images if available
    for(let i = 0; i < result.length; i++){
        let group = result[i]
        const groupId = group.id
        const numMembers = await Membership.count({ where: { groupId } })
        const previewImage = await GroupImage.findOne({where:{groupId, preview:true}})

        group.numMembers = numMembers;
        if(previewImage) group.previewImage = previewImage.url
        else group.previewImage = "Preview not available"
        final.push(group)
        // console.log(allGroups)
    }


    res.json({Groups:final})
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
        console.log(group)
        res.json({
            id: group.id,
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
router.put('/:groupId', requireAuth, validateCreation, async (req, res, next) => {
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
//NEED TO FIX DATE
router.get('/', async (req, res, next) => {
    const groups = await Group.findAll({})
    const allGroups  = []

    //calculate numMembers and preview images if available
    for(let i = 0; i < groups.length; i++){
        let group = groups[i]
        const groupId = group.id
        const numMembers = await Membership.count({ where: { groupId } })
        const previewImage = await GroupImage.findOne({where:{groupId, preview:true}})
        group = group.toJSON()
        group.numMembers = numMembers;
        if(previewImage) group.previewImage = previewImage.url
        else group.previewImage = "Preview not available"
        allGroups.push(group)
        console.log(allGroups)
    }

    console.log(allGroups)
    res.json({Groups: allGroups})
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
