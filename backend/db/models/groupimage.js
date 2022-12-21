'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // GroupImage.belongsToMany(models.Event,{
      //   through:models.Group,
      //   foreignKey:'groupId',
      //   otherKey:'groupId'
      // })
      // GroupImage.belongsToMany(models.Venue,{
      //   through:models.Group,
      //   foreignKey:'groupId',
      //   otherKey:'groupId'
      // })
      // GroupImage.belongsToMany(models.Membership,{
      //   through:models.Group,
      //   foreignKey:'groupId',
      //   otherKey:'groupId'
      // })
      GroupImage.belongsTo(models.Group, {
        foreignKey:'groupId'
      })

    }
  }
  GroupImage.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    url: {
      type: DataTypes.STRING
    },
    preview: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'GroupImage',
  });
  return GroupImage;
};
