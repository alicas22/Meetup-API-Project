const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const { Group, Event, Membership, GroupImage, EventImage, Attendance } = require('../../db/models');

router.get('/', async (req, res) => {
  const query = req.query.q;

  //postgres version
  const groupResults = await Group.findAll({
    where: {
      name: {
        [Op.iLike]: `%${query}%`,
      },
    },
  });

  const eventResults = await Event.findAll({
    where: {
      name: {
        [Op.iLike]: `%${query}%`,
      },
    },
  });

  //sequelize version
  // const groupResults = await Group.findAll({
  //   where: {
  //     name: {
  //       [Op.like]: Sequelize.fn('LOWER', `%${query}%`),
  //     },
  //   },
  // });

  // const eventResults = await Event.findAll({
  //   where: {
  //     name: {
  //       [Op.like]: Sequelize.fn('LOWER', `%${query}%`),
  //     },
  //   },
  // });

  // calculate numMembers and previewImage for groups
  const allGroups = [];
  for (let i = 0; i < groupResults.length; i++) {
    const group = groupResults[i];
    const groupId = group.id;
    const numMembers = await Membership.count({ where: { groupId, [Op.or]: [{ status: 'co-host' }, { status: 'member' }] } });
    const previewImage = await GroupImage.findOne({ where: { groupId, preview: true } });
    const groupWithDetails = {
      ...group.toJSON(),
      numMembers,
      previewImage: previewImage ? previewImage.url : 'Preview not available',
    };
    allGroups.push(groupWithDetails);
  }

  // calculate numAttending and previewImage for events
  const allEvents = [];
  for (let i = 0; i < eventResults.length; i++) {
    const event = eventResults[i];
    const eventId = event.id;
    const numAttending = await Attendance.count({ where: { eventId, status: 'attending' } });
    const previewImage = await EventImage.findOne({ where: { eventId, preview: true } });
    const eventWithDetails = {
      ...event.toJSON(),
      numAttending,
      previewImage: previewImage ? previewImage.url : 'Preview not available',
    };
    allEvents.push(eventWithDetails);
  }

  const responseData = {
    groups: allGroups,
    events: allEvents,
  };

  res.json(responseData);
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { Op } = require('sequelize');
// const Sequelize = require('sequelize');
// const { Group, Event } = require('../../db/models');




// router.get('/', async (req, res) => {
//   console.log('req object from route', req)
//     const query = req.query.q;

//   const groupResults = await Group.findAll({


//     where: {
//       name: {
//         [Op.like]: Sequelize.fn('LOWER', `%${query}%`),
//       },
//     },
//   });

//   const eventResults = await Event.findAll({


//     where: {
//       name: {
//         [Op.like]: Sequelize.fn('LOWER', `%${query}%`),
//       },
//     },
//   });


//   const responseData = {
//     groups: groupResults.map(group => group.toJSON()),
//     events: eventResults.map(event => event.toJSON())
//   };


//   res.json(responseData);
// });

// module.exports = router;
