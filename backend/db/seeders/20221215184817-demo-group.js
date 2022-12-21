'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Groups';
    return queryInterface.bulkInsert(options, [
      {
        organizerId: 1,
        name:"Party up in this hizzy",
        about:"this is a party where people do party things with other party people",
        type: "In person",
        private: false,
        city:'Las Vegas',
        state:'NV',

      },
      {
        organizerId: 2,
        name:"Nerd gathering for nerds",
        about:"this is a nerd gathering where all the nerds play D&D with Anton",
        type: "Online",
        private: true,
        city:'Nerdtown',
        state:'OH',
      },
      {
        organizerId: 3,
        name:"Pray for the Sinners",
        about:"this is a church group where we party in prayers for all the sinners can i get an amen",
        type: "In person",
        private: false,
        city:'Prayer',
        state:'FL',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Party up in this hizzy', 'Nerd gathering for nerds', 'Pray for the Sinners'] }
    }, {});
  }
};
