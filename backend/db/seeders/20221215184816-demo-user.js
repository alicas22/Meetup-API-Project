'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'john@smith.com',
        firstName: 'John',
        lastName: 'Smith',
        username: 'JohnSmith',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        firstName: 'Crystal',
        lastName: 'Salazar',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        firstName: 'Jordan',
        lastName: 'Lee',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'demo@user.io',
        firstName: 'Demo',
        lastName: 'User',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user3@user.io',
        firstName: 'Tanya',
        lastName: 'Smith',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user4@user.io',
        firstName: 'Andrew',
        lastName: 'Ross',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user5@user.io',
        firstName: 'Jasmine',
        lastName: 'Brown',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user6@user.io',
        firstName: 'Brianne',
        lastName: 'Baker',
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user7@user.io',
        firstName: 'Eddie',
        lastName: 'Stewart',
        username: 'FakeUser7',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user8@user.io',
        firstName: 'Kayla',
        lastName: 'Williams',
        username: 'FakeUser8',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'JohnSmith'] }
    }, {});
  }
};
