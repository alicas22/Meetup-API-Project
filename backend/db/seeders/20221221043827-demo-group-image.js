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
      },
      {
        groupId:4,
        url:'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        groupId:5,
        url:'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview:true
      },
      {
        groupId:6,
        url:'https://images.pexels.com/photos/3820380/pexels-photo-3820380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview:true
      },
      {
        groupId:7,
        url:'https://images.pexels.com/photos/4555454/pexels-photo-4555454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        groupId:8,
        url:'https://images.pexels.com/photos/1450116/pexels-photo-1450116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview:true
      },
      {
        groupId:9,
        url:'https://images.pexels.com/photos/2440079/pexels-photo-2440079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview:true
      },
      {
        groupId:10,
        url:'https://images.pexels.com/photos/3131971/pexels-photo-3131971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'GroupImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      groupId: { [Op.in]: [1,2,3,4,5,6,7,8,9,10] }
    }, {});
  }
};
