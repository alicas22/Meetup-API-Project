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
        url: 'https://images.pexels.com/photos/5533312/pexels-photo-5533312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        eventId:3,
        url:'https://images.pexels.com/photos/2444852/pexels-photo-2444852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        eventId:4,
        url:'https://slyflourish.com/images/one_missing_player.jpg',
        preview: true
      },
      {
        eventId:5,
        url: 'https://www.wired.com/wp-content/uploads/images_blogs/photos/uncategorized/2008/07/29/thennow.jpg',
        preview: true
      },
      {
        eventId:6,
        url:'https://www.mccy.gov.sg/kaya/-/media/Kaya/community/dungeons-and-dragons/DnD-04.jpg',
        preview: true
      },
      {
        eventId:7,
        url:'https://cdn.shortpixel.ai/spai/q_lossy+w_1082+to_webp+ret_img/https://beachvolleyball.com.au/wp-content/uploads/2021/12/beach-play2.jpg',
        preview: true
      },
      {
        eventId:8,
        url: 'https://images.pexels.com/photos/8380021/pexels-photo-8380021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        eventId:9,
        url:'https://images.pexels.com/photos/14084426/pexels-photo-14084426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        eventId:10,
        url:'https://images.pexels.com/photos/1739093/pexels-photo-1739093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        eventId:11,
        url: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        eventId:12,
        url:'https://images.pexels.com/photos/1542495/pexels-photo-1542495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        eventId:13,
        url:'https://images.pexels.com/photos/8436490/pexels-photo-8436490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        eventId:14,
        url: 'https://images.pexels.com/photos/6952003/pexels-photo-6952003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        eventId:15,
        url:'https://images.pexels.com/photos/3684847/pexels-photo-3684847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        eventId:16,
        url:'https://images.pexels.com/photos/1453097/pexels-photo-1453097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        eventId:17,
        url: 'https://images.pexels.com/photos/593467/pexels-photo-593467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        eventId:18,
        url:'https://images.pexels.com/photos/5158956/pexels-photo-5158956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        eventId:19,
        url:'https://images.pexels.com/photos/847402/pexels-photo-847402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        eventId:20,
        url: 'https://images.pexels.com/photos/3694341/pexels-photo-3694341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        eventId:21,
        url:'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        eventId:22,
        url:'https://images.pexels.com/photos/2346001/pexels-photo-2346001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'EventImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      preview: { [Op.in]: [true] }
    }, {});
  }
};
