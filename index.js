var express = require('express')
var bodyParser = require('body-parser')
var ejsLayouts = require('express-ejs-layouts')
var MarkovChain = require('markovchain')

var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var socket;

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

//-----------
	var MarkovChain = require('markovchain')
		fs = require('fs')
	 	quotes = new MarkovChain(fs.readFileSync('quotes.txt', 'utf8'))

	var useUpperCase = function(wordList) {
	  var tmpList = Object.keys(wordList).filter(function(word) {
	    return word[0] >= 'A' && word[0] <= 'Z'
	  })
	  return tmpList[~~(Math.random()*tmpList.length)]
	}

	// same as passing value, 5 to end function 
	var stopAfter = function(sentence) {
	  return sentence.split(" ").length >= 20
	}
//----------

app.get('/', function(req, res){
	res.render('main/index')
})
app.get('/profile', isLoggedIn, function(req, res){
	res.render('profile')
})

app.get('/companion', function(req, res){
	res.render('companion/index')
})
app.get('/companion/one', function(req, res){
	res.render('companion/companion_1')
})
app.get('/companion/two', function(req, res){
	res.render('companion/companion_2')
})




//controllers

app.use('/auth', require('./controllers/auth'));
app.use('/markov', require('./controllers/markov'));
 
// SOCKET IO CONNECTION HANDLER
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });

	socket.on('send message', function(data){
		console.log("emitting new message");
		io.sockets.emit()
	})   

    // socket.on('send', function(data){
    // 	io.sockets.emit()
    // })
});


http.listen(process.env.PORT || 3000);

// app.listen(process.env.PORT || 3000)