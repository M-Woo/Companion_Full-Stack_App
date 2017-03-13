var express = require('express');
var db = require('../models');
var passport = require("../config/passportConfig");
var router = express.Router();

router.use(express.static('public'));


router.get('/login', function(req, res){
	res.render('auth/login');
})
router.post("/login", passport.authenticate("local", {
  successRedirect: "/companion",
  successFlash: "Good job, you logged in",
  failureRedirect: "/auth/login",
  failureFlash: "Invalid Credentials"
}));
router.get('/signup', function(req, res){
	res.render('auth/signup');
})
router.post('/signup', function(req, res){
	db.user.findOrCreate({ //check if email exists
		where: {email: req.body.email},
		defaults: {
			username: req.body.username,
			password: req.body.password
		}
	}).spread(function(user, created){
		if (created) {
	      passport.authenticate("local", {
	        successRedirect: "/",
	        successFlash: "Account create and logged in"
	      })(req, res);
		} else {
	      req.flash("error", "Email already exists");
	      res.redirect("/auth/signup");
		}
	}).catch(function(error){
		req.flash('error', err.message)
		res.redirect('/auth/signup');
	});
});
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "You are logged out");
  res.redirect("/");
});



module.exports = router;