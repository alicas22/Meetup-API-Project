'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Membership.belongsTo(models.User, {
        foreignKey: "userId"
      })
      Membership.belongsTo(models.Group, {
        foreignKey: "groupId"
      })
      // Membership.belongsToMany(models.Attendance,{
      //   through: models.User,
      //   foreignKey:'userId',
      //   otherKey: 'userId'
      // })
      // Membership.belongsToMany(models.Group,{
      //   through: models.User,
      //   foreignKey:'userId',
      //   otherKey: 'organizerId'
      // })
    }
  }
  Membership.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('co-host', 'member', 'pending')
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Membership',
  });
  return Membership;
};
