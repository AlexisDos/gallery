'use strict';
module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define('Imagessss', {
    name: DataTypes.STRING,
    server: DataTypes.STRING,
    url: DataTypes.STRING,
    email: DataTypes.STRING,
    review: DataTypes.STRING,
    facebook: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  Images.associate = function(models) {
    // associations can be defined here
  };
  return Images;
};