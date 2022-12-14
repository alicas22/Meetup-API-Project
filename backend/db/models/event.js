'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(models.EventImage,{
        foreignKey:'eventId',
        onDelete: "CASCADE",  hooks: true
      })
      Event.hasMany(models.Attendance,{
        foreignKey:'eventId',
        onDelete: "CASCADE",  hooks: true
      })
      Event.belongsTo(models.Venue,{
        foreignKey:'venueId'
      })
      Event.belongsTo(models.Group,{
        foreignKey:'groupId'
      })
      // Event.belongsToMany(models.GroupImage,{
      //   through: models.Group,
      //   foreignKey:'groupId',
      //   otherKey: 'groupId'
      // })
      // Event.belongsToMany(models.Membership,{
      //   through: models.Group,
      //   foreignKey:'groupId',
      //   otherKey: 'groupId'
      // })
      // Event.belongsToMany(models.Venue,{
      //   through: models.Group,
      //   foreignKey:'groupId',
      //   otherKey: 'groupId'
      // })
    }
  }
  Event.init({
    venueId: {
      type:DataTypes.INTEGER,
      allowNull:true,

    },
    groupId: {
      type:DataTypes.INTEGER,
      allowNull:false,

    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.ENUM("Online", "In person")
    },
    capacity: {
      type:DataTypes.INTEGER
    },
    price: {
      type:DataTypes.DECIMAL(10,2)
    },
    startDate: {
      type: DataTypes.DATE
    },
    endDate: {
      type: DataTypes.DATE
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
