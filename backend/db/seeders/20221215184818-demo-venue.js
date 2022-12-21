'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Venues';
    return queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        address: "123 Make Believe Way",
        city: "Imaginationland",
        state: "CA",
        lat: 36.7783,
        lng: 119.4179,
      },
      {
        groupId: 2,
        address: "54321 This Aint Real St",
        city: "Faketon",
        state: "LA",
        lat: 30.9843,
        lng: 91.9623,
      },
      {
        groupId: 3,
        address: "21 Whos Asking Blvd",
        city: "Snitchfree",
        state: "NY",
        lat: 40.7128,
        lng: 74.0060,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Venues';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      city: { [Op.in]: ['Imaginationland', 'Faketon', 'Snitchfree'] }
    }, {});
  }
};
