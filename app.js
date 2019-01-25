const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const imagesRouter = require('./routes/images');
const authRouter = require('./routes/auth');

const app = express();

app.use(session({secret:'session', resave: false, saveUninitialized: true}));

app.use(fileUpload());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/images', imagesRouter);

module.exports = app;
