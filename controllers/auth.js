'use strict';


const passport = require('passport');
require('./_passport.js');

module.exports = {
  login(req, res, next){
    passport.authenticate('local', async (err, user, info) => {   
    try{
        if(err) throw new Error(err);
        if(info) throw new Error(info.message);

        const response = await {
            "isAuth": true,
            "message": "These credentials has been validated."
        };

        await res.status(201).json(response);
    }catch(err){
        next(err);
    }   
    })(req, res, next)
  }
 }