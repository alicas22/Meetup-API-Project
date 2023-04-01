'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Memberships';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        groupId: 1,
        status: "member"
      },
      {
        userId: 2,
        groupId: 1,
        status: "member"
      },
      {
        userId: 3,
        groupId: 1,
        status: "member"
      },
      {
        userId: 4,
        groupId: 2,
        status: "member"
      },
      {
        userId: 5,
        groupId: 2,
        status: "member"
      },
      {
        userId: 6,
        groupId: 2,
        status: "member"
      },
      {
        userId: 7,
        groupId: 3,
        status: "member"
      },
      {
        userId: 8,
        groupId: 3,
        status: "member"
      },
      {
        userId: 9,
        groupId: 3,
        status: "member"
      },
      {
        userId: 9,
        groupId: 4,
        status: "member"
      },
      {
        userId: 8,
        groupId: 4,
        status: "member"
      },
      {
        userId: 7,
        groupId: 5,
        status: "member"
      },
      {
        userId: 6,
        groupId: 6,
        status: "member"
      },
      {
        userId: 5,
        groupId: 6,
        status: "member"
      },
      {
        userId: 4,
        groupId: 7,
        status: "member"
      },
      {
        userId: 3,
        groupId: 7,
        status: "member"
      },
      {
        userId: 2,
        groupId: 8,
        status: "member"
      },
      {
        userId: 1,
        groupId: 9,
        status: "member"
      },
      {
        userId: 5,
        groupId: 9,
        status: "member"
      },
      {
        userId: 6,
        groupId: 9,
        status: "member"
      },
      {
        userId: 7,
        groupId: 10,
        status: "member"
      },
      {
        userId: 8,
        groupId: 1,
        status: "member"
      },
      {
        userId: 9,
        groupId: 6,
        status: "member"
      },
      {
        userId: 10,
        groupId: 7,
        status: "member"
      },
      {
        userId: 6,
        groupId: 1,
        status: "member"
      },
      {
        userId: 4,
        groupId: 3,
        status: "member"
      },
      {
        userId: 10,
        groupId:8,
        status: "member"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'Memberships';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
    //  return  queryInterface.bulkDelete(options)
  }
};
