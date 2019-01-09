//jshint node: true, esversion: 6

const Authentification = module.exports;


Authentification.isEmployeeAuthenticated = function (req, res, next){
	if(req.isAuthenticated() && req.session.passport.user.type === 'worker'){
		return next();
	} else {
		if (req.cookies.remember && req.cookies.remember.type === 'worker') {
			req.session.passport = { 'user': req.cookies.remember };
			return next();
		}
		res.redirect('/');
	}
};

Authentification.isCompanyAuthenticated = function (req, res, next) {
	if(req.isAuthenticated() && req.session.passport.user.type === 'company'){
		return next();
	} else {
		if (req.cookies.remember && req.cookies.remember.type === 'company') {
			req.session.passport = { 'user': req.cookies.remember };
			return next();
		}
		res.redirect('/');
	}
};

Authentification.isUserAuthenticated = function (req, res, next) {
	if(req.isAuthenticated()){
		return next();
	} else {
		if (req.cookies.remember) {
			req.session.passport = { 'user': req.cookies.remember };
			return next();
		}
		res.redirect('/');
	}
};