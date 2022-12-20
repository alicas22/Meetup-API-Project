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
      // Group.hasMany(models.Event,{
      //   foreignKey:'groupId'
      // })
      // Group.hasMany(models.Venue,{
      //   foreignKey:'groupId'
      // })
      // Group.hasMany(models.GroupImage,{
      //   foreignKey:'groupId'
      // })
      // Group.hasMany(models.Membership,{
      //   foreignKey:'groupId'
      // })
      // Group.belongsTo(models.User,{
      //   foreignKey:'organizerId'
      // })
      // Group.belongsToMany(models.Attendance,{
      //   through: models.User,
      //   foreignKey:'organizerId',
      //   otherKey: 'userId'
      // })
    }
  }
  Group.init({
    organizerId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING
    },
    about: {
      type: DataTypes.TEXT
    },
    // type: {
    //   type: DataTypes.ENUM
    // },
    private: {
      type: DataTypes.BOOLEAN},
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
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
