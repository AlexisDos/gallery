'use strict';

const passport = require('passport');
const express = require('express');
const session = require('express-session');
require('./_passport.js');

module.exports = {
  login(req, res, next){
    passport.authenticate('local', async (err, user, info) => {   
    try{
        if(err) {throw new Error(err)};
        if(info){ 
            await res.status(401).json({message: "Incorrect username or password"});
        }
 
        const response = await {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                isAuth: true,
                message: "These credentials has been validated."
        };

        req.session.dataUser = response;

        await res.status(201).json(response);
        
    }catch(err){
        next(err);
    }   
    })(req, res, next)
  }
 }