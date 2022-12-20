'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Attendance.belongsTo(models.Event,
      //   { foreignKey: 'eventId' })
      // Attendance.belongsTo(models.User,
      //   {foreignKey:'userId'})
      // Attendance.belongsToMany(models.Membership,
      //   {
      //     through: models.User,
      //     foreignKey: 'userId',
      //     otherKey: 'userId'
      //   })
      // Attendance.belongsToMany(models.Group,
      //   {
      //     through: models.User,
      //     foreignKey: 'userId',
      //     otherKey: 'organizerId'
      //   })
    }
  }
  Attendance.init({
    eventId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    // status: {
    //   type: DataTypes.ENUM
    // },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};
