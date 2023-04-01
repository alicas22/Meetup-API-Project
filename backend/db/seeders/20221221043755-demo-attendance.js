'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Attendances';
    return queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        userId: 1,
        status: 'attending'

      },
      {
        eventId: 1,
        userId: 2,
        status: 'attending'
      },
      {
        eventId: 1,
        userId: 3,
        status: 'attending'
      },
      {
        eventId: 2,
        userId: 1,
        status: 'attending'

      },
      {
        eventId: 2,
        userId: 2,
        status: 'attending'
      },
      {
        eventId: 2,
        userId: 3,
        status: 'attending'
      },
      {
        eventId: 3,
        userId: 1,
        status: 'attending'

      },
      {
        eventId: 3,
        userId: 2,
        status: 'attending'
      },
      {
        eventId: 3,
        userId: 4,
        status: 'attending'
      },
      {
        eventId: 4,
        userId: 5,
        status: 'attending'
      },
      {
        eventId: 4,
        userId: 6,
        status: 'attending'
      },
      {
        eventId: 1,
        userId: 7,
        status: 'attending'
      },
      {
        eventId: 5,
        userId: 8,
        status: 'attending'
      },
      {
        eventId: 5,
        userId: 9,
        status: 'attending'
      },
      {
        eventId: 6,
        userId: 10,
        status: 'attending'
      },
      {
        eventId: 7,
        userId: 1,
        status: 'attending'
      },
      {
        eventId: 8,
        userId: 2,
        status: 'attending'
      },
      {
        eventId: 8,
        userId: 3,
        status: 'attending'
      },
      {
        eventId: 9,
        userId: 4,
        status: 'attending'
      },
      {
        eventId: 9,
        userId: 5,
        status: 'attending'
      },
      {
        eventId: 9,
        userId: 6,
        status: 'attending'
      },
      {
        eventId: 10,
        userId: 7,
        status: 'attending'
      },
      {
        eventId: 11,
        userId: 8,
        status: 'attending'
      },
      {
        eventId: 11,
        userId: 9,
        status: 'attending'
      },
      {
        eventId: 12,
        userId: 10,
        status: 'attending'
      },
      {
        eventId: 12,
        userId: 9,
        status: 'attending'
      },
      {
        eventId: 13,
        userId: 8,
        status: 'attending'
      },
      {
        eventId: 14,
        userId: 7,
        status: 'attending'
      },
      {
        eventId: 14,
        userId: 6,
        status: 'attending'
      },
      {
        eventId: 14,
        userId: 5,
        status: 'attending'
      },
      {
        eventId: 15,
        userId: 4,
        status: 'attending'
      },
      {
        eventId: 16,
        userId: 3,
        status: 'attending'
      },
      {
        eventId: 16,
        userId: 2,
        status: 'attending'
      },
      {
        eventId: 16,
        userId: 1,
        status: 'attending'
      },
      {
        eventId: 17,
        userId: 2,
        status: 'attending'
      },
      {
        eventId: 17,
        userId: 3,
        status: 'attending'
      },
      {
        eventId: 18,
        userId: 4,
        status: 'attending'
      },
      {
        eventId: 18,
        userId: 5,
        status: 'attending'
      },
      {
        eventId: 19,
        userId: 6,
        status: 'attending'
      },
      {
        eventId: 19,
        userId: 7,
        status: 'attending'
      },
      {
        eventId: 20,
        userId: 8,
        status: 'attending'
      },
      {
        eventId: 21,
        userId: 9,
        status: 'attending'
      },
      {
        eventId: 22,
        userId: 10,
        status: 'attending'
      },
      {
        eventId: 22,
        userId: 1,
        status: 'attending'
      },
      {
        eventId: 22,
        userId: 2,
        status: 'attending'
      },
      {
        eventId: 22,
        userId: 3,
        status: 'attending'
      },
      {
        eventId: 22,
        userId: 4,
        status: 'attending'
      },
      {
        eventId: 1,
        userId: 5,
        status: 'attending'
      },
      {
        eventId: 1,
        userId: 6,
        status: 'attending'
      },
      {
        eventId: 1,
        userId: 7,
        status: 'attending'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Attendances';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      status: { [Op.in]: ['attending'] }
    }, {});
  // return  queryInterface.bulkDelete(options)
  }
};
