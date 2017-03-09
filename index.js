var express = require('express')
var bodyParser = require('body-parser')
var ejsLayouts = require('express-ejs-layouts')

var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var session = require('express-session');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn')
var passport = require('./config/passportConfig');
require('dotenv').config();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
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
 
//SOCKET IO CONNECTION HANDLER
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

http.listen(3000);