'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Venue.hasMany(models.Event,{
      //   foreignKey: 'venueId'
      // })
      // Venue.belongsToMany(models.Event, {
      //   through: models.Group,
      //   foreignKey:'groupId',
      //   otherKey:'groupId'
      // })
      // Venue.belongsTo(models.Group,{
      //   foreignKey:'groupId'
      // })
    }
  }
  Venue.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    address: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    lat: {
      type: DataTypes.DECIMAL
    },
    lng: {
      type: DataTypes.DECIMAL
    },
    createdAt: {
      type:DataTypes.DATE
    },
    updatedAt: {
      type:DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Venue',
  });
  return Venue;
};
