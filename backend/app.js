var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// load modules
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');

// connect to db
const { mongoose } = require('./db/mongoose');

var indexRouter = require('./routes');
var usersRouter = require('./routes/api/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/dist/frontend')));


app.use(bodyParser.json());

// load middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'thisisasecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(flash());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

// When no path matches, render frontend index.html file
// this route will be triggered if any of the routes above did not match
app.all("*", (req,res,next) => {
    console.log('CATCHING ALL')
    res.sendFile(path.resolve(__dirname, '../frontend/dist/frontend/index.html'))
});

module.exports = app;
