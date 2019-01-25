'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models').User;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ where: { username: username, deletedAt: null } })
    .then(data => {
    	console.log(1 + JSON.stringify(data));
        if(!data) return done(null, null, { message: "Incorrect username" });
        if(User.prototype.validPassword(password, data.password) === false) return done(null, null, { message: "Incorrect password" });
        return done(null, data)
        console.log(2 + JSON.stringfy(data));
    })
    .catch(error => done(error, null));
  })
);