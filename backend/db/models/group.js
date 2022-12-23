'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.hasMany(models.Event, {
        foreignKey: 'groupId',
        onDelete: "CASCADE", hooks: true
      })
      Group.hasMany(models.Venue, {
        foreignKey: 'groupId',
        onDelete: "CASCADE", hooks: true
      })
      Group.hasMany(models.GroupImage, {
        foreignKey: 'groupId',
        onDelete: "CASCADE", hooks: true
      })
      Group.hasMany(models.Membership, {
        foreignKey: 'groupId',
        onDelete: "CASCADE", hooks: true
      })
      Group.belongsTo(models.User, {
        foreignKey: 'organizerId'
      })
      // Group.belongsToMany(models.Attendance,{
      //   through: models.User,
      //   foreignKey:'organizerId',
      //   otherKey: 'userId'
      // })
      // Group.belongsToMany(models.Membership,{
      //   through: models.User,
      //   foreignKey:'organizerId',
      //   otherKey: 'userId'
      // })
    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(60),
      validate: {
        len: [1, 60]
      }
    },
    about: {
      type: DataTypes.TEXT,
      validate: {
        len: [50, 10000]
      }
    },
    type: {
      type: DataTypes.ENUM('Online', 'In person')
    },
    private: {
      type: DataTypes.BOOLEAN
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
