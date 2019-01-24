'use strict';

const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    paranoid: true
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  User.prototype.validPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
  };
  User.addHook("beforeCreate", async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });
  return User;
};