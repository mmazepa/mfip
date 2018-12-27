/*jshint node: true, esversion: 6 */
const Strategy = module.exports;

const Employee = require("../model/employee");
const Company = require('../model/company');

const bcrypt = require('bcrypt');
const LocalStrategy = require("passport-local");

Strategy.Local = new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
(req, email, password, done) => {
    if (req.body.type === 'worker') {
        Employee.getHashByEmail(email).then((user) => {
            console.log(password);
            bcrypt.compare(password, user.password, function(err, ans) {
                if(ans) {
                    // Passwords match
                    console.log("Passwords match");
                    user.type = 'worker';
                    return done(null, user);
                } else {
                    // Passwords don't match
                    console.log("DON'T");
                    console.debug(user);
                    return done(null, false, { message: 'Undefined User' });
                }
            });
        }).catch((error) => {
            if(error.code === 0) {
                console.log("Incorrect data");
                return done(null, false, { message: 'Incorrect data' });
            }
        });
    } else {
        Company.getHashByEmail(email).then((company) => {
            bcrypt.compare(password, company.password, function(err, ans) {
                if(ans) {
                    // Passwords match
                    console.log("Passwords match");
                    company.type = 'company';
                    return done(null, company);
                } else {
                    // Passwords don't match
                    console.log("DON'T");
                    console.debug(company);
                    return done(null, false, { message: 'Undefined company' });
                }
            });
        }).catch((error) => {
            if(error.code === 0) {
                console.log("Incorrect data");
                return done(null, false, { message: 'Incorrect data' });
            }
        });

    }
});