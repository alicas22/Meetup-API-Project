'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'GroupImages';
    return queryInterface.bulkInsert(options, [
      {
        groupId:1,
        url:'https://images.pexels.com/photos/1835718/pexels-photo-1835718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        groupId:2,
        url:'https://images.pexels.com/photos/3359734/pexels-photo-3359734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview:true
      },
      {
        groupId:3,
        url:'https://images.pexels.com/photos/10855503/pexels-photo-10855503.jpeg?auto=compress&cs=tinysrgb&w=1600',
        preview:true
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'GroupImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['https://images.pexels.com/photos/1835718/pexels-photo-1835718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'https://images.pexels.com/photos/3359734/pexels-photo-3359734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'https://images.pexels.com/photos/10855503/pexels-photo-10855503.jpeg?auto=compress&cs=tinysrgb&w=1600'] }
    }, {});
  }
};
