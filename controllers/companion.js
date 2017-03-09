var express = require('express');
var db = require('../models');
var passport = require("../config/passportConfig");
var MarkovChain = require('markovchain')
var router = express.Router();

var http = require("http").Server(router);
var io = require("socket.io")(http);

router.get('/', function(req, res){
	res.render('companion/index')
})

router.get('/one', function(req, res){
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
	io.emit(quotes.start(useUpperCase).end(stopAfter).process())
	res.render('companion/companion_1')
})

module.exports = router;

