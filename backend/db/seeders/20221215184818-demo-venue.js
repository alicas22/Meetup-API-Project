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
        address: "24056 Malibu Rd",
        city: "Malibu",
        state: "CA",
        lat: 34.0317,
        lng: -118.6996,
      },
      {
        groupId: 2,
        address: "1313 Disneyland Dr",
        city: "Anaheim",
        state: "CA",
        lat: 33.8123,
        lng: -117.9190,
      },
      {
        groupId: 3,
        address: "1 Central Park S",
        city: "New York",
        state: "NY",
        lat: 40.7648,
        lng: -73.9745,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Venues';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      city: { [Op.in]: ['Malibu', 'Anaheim', 'New York'] }
    }, {});
  }
};
