var express = require('express')
var bodyParser = require('body-parser')
var ejsLayouts = require('express-ejs-layouts')
var session = require('express-session');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn')
var passport = require('./config/passportConfig');
require('dotenv').config();

var port = 3000;

var app = express();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});

app.get('/', function(req, res){
	res.render('main/index')
})

app.get('/profile', isLoggedIn, function(req, res){
	res.render('profile')
})

//controllers

app.use('/auth', require('./controllers/auth'));
app.use('/companion', require('./controllers/companion'));
//listen

// var server = app.listen(process.env.PORT || 3000);

var io = require('socket.io').listen(app.listen(port));
module.exports = io;
 
//SOCKET IO CONNCTION HANDLER
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});