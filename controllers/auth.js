var express = require('express');
var db = require('../models');
var router = express.Router();


router.get('/login', function(req, res){
	res.render('auth/login');
})


router.get('/signup', function(req, res){
	res.render('auth/signup');
})



module.exports = router;