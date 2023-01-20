'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'EventImages';
    return queryInterface.bulkInsert(options, [
      {
        eventId:1,
        url:'https://blackbeltmag.com/media-library/muay-thai.png?id=29903923&width=1245&height=700&quality=85&coordinates=0%2C61%2C0%2C65',
        preview: true
      },
      {
        eventId:2,
        url: 'https://www.mccy.gov.sg/kaya/-/media/Kaya/community/dungeons-and-dragons/DnD-04.jpg',
        preview: true
      },
      {
        eventId:3,
        url:'https://cdn.shortpixel.ai/spai/q_lossy+w_1082+to_webp+ret_img/https://beachvolleyball.com.au/wp-content/uploads/2021/12/beach-play2.jpg',
        preview: true
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'EventImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['https://blackbeltmag.com/media-library/muay-thai.png?id=29903923&width=1245&height=700&quality=85&coordinates=0%2C61%2C0%2C65', 'https://www.mccy.gov.sg/kaya/-/media/Kaya/community/dungeons-and-dragons/DnD-04.jpg', 'https://cdn.shortpixel.ai/spai/q_lossy+w_1082+to_webp+ret_img/https://beachvolleyball.com.au/wp-content/uploads/2021/12/beach-play2.jpg'] }
    }, {});
  }
};
