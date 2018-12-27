//jshint node: true, esversion: 6

const express = require('express');
const router = express.Router();

var index = require("../controllers/indexController.js");

function isEmployeeAuthenticated(req, res, next){
	if(req.isAuthenticated() && req.session.passport.user.type === 'worker'){
		return next();
	} else {
		if (req.cookies.remember && req.cookies.remember.type === 'worker') {
			req.session.passport = { 'user': req.cookies.remember };
			return next();
		}
		res.redirect('/');
	}
}

function isCompanyAuthenticated(req, res, next) {
	if(req.isAuthenticated() && req.session.passport.user.type === 'company'){
		return next();
	} else {
		if (req.cookies.remember && req.cookies.remember.type === 'company') {
			req.session.passport = { 'user': req.cookies.remember };
			return next();
		}
		res.redirect('/');
	}
}

function isUserAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	} else {
		if (req.cookies.remember) {
			req.session.passport = { 'user': req.cookies.remember };
			return next();
		}
		res.redirect('/');
	}
}


router.get('/', index.homepage);
router.get('/firm', isCompanyAuthenticated, index.firm);
router.get('/worker', isEmployeeAuthenticated, index.worker);
router.get('/workstations', index.workstations);
router.get('/workHistory', index.workHistory);
router.get('/cv', index.cv);
router.get('/cv/edit', index.cvEdit);
router.get('/signup', index.signup);
router.post('/signup', index.signup_post);
router.get('/logout', index.logout);

module.exports = router;
