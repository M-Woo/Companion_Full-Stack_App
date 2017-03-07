var express = require('express');
var db = require('../models');
var router = express.Router();


router.get('/login', function(req, res){
	res.render('auth/login');
})


router.get('/signup', function(req, res){
	res.render('auth/signup');
})

router.post('/signup', function(req, res){
	db.user.findOrCreate({
		where: {email: req.body.email},
		defaults: {
			username: req.body.username,
			password: req.body.password
		}
	}).spread(function(user, created){
		if (created) {
			console.log('User created');
			res.redirect('/profile');
		} else {
			console.log('Email already exists');
			res.redirect('/auth/signup');
		}
	}).catch(function(error){
		req.flash('error', err.message)
		res.redirect('/auth/signup');
	});
});



module.exports = router;