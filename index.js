var express = require('express')
var bodyParser = require('body-parser')
var ejsLayouts = require('express-ejs-layouts')

var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var controller = require('./controllers/companion')

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


// app.get('/companion/one', function(req, res){
// 		// $('#send').click(function(){
// 	var MarkovChain = require('markovchain')
// 		fs = require('fs')
// 	 	quotes = new MarkovChain(fs.readFileSync('quotes.txt', 'utf8'))

// 	var useUpperCase = function(wordList) {
// 	  var tmpList = Object.keys(wordList).filter(function(word) {
// 	    return word[0] >= 'A' && word[0] <= 'Z'
// 	  })
// 	  return tmpList[~~(Math.random()*tmpList.length)]
// 	}

// 	// same as passing value, 5 to end function 
// 	var stopAfter = function(sentence) {
// 	  return sentence.split(" ").length >= 20
// 	}
// 	res.send(quotes.start(useUpperCase).end(stopAfter).process())
// // })
// 	res.render('companion/companion_1')
// });

//controllers

app.use('/auth', require('./controllers/auth'));
app.use('/companion', require('./controllers/companion'));
//listen
 
// SOCKET IO CONNECTION HANDLER
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    // socket.emit('message',{message: quotes.start(useUpperCase).end(stopAfter).process()})
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});


http.listen(process.env.PORT || 3000);

// app.listen(process.env.PORT || 3000)