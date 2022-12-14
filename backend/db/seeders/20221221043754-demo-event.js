'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Events';
    return queryInterface.bulkInsert(options, [
      {
        venueId:1,
        groupId: 1,
        name:"March for Freedom",
        description:"this is a march for freedom we will not be silenced come be a true american",
        type: "In person",
        capacity:3000,
        price: 10,
        startDate:new Date("2023-1-6"),
        endDate: new Date("2023-1-6")
      },
      {
        venueId:2,
        groupId:2,
        name: "Knitting for Grannies",
        description:"Let's go on a knitting adventure with your granny who loves to knit cat sweaters",
        type: "Online",
        capacity: 100,
        price:1,
        startDate:new Date("2023-12-31"),
        endDate: new Date("2024-01-01")
      },
      {
        venueId:3,
        groupId:3,
        name: "Eat a Whole Cow",
        description:"We will be smoking a whole cow for charity, come eat it for money",
        type:"In person",
        capacity:300,
        price:50,
        startDate: new Date("2024-6-13"),
        endDate: new Date("2024-6-14")
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Events';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['March for Freedom', 'Knitting for Grannies', 'Eat a Whole Cow'] }
    }, {});
  }
};
