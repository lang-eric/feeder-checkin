var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

function sendMsgToCheckinChannel(msg) {
    return client.channels.fetch('889959644913602620').then(channel => channel.send(msg));
}

client.login(token);

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

const JSONdb = require('simple-json-db');

const db = new JSONdb('database.json');
app.locals.db = db;

app.locals.discordStuff = {};
app.locals.discordStuff.sendMsgToCheckinChannel = sendMsgToCheckinChannel;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/admin.js', express.static(__dirname + 'Javascripts/admin.js'));

app.use(adminRouter);
app.use(indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;