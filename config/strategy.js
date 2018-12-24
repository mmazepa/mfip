/*jshint node: true, esversion: 6 */
const Strategy = module.exports;
const Employee = require("../model/employee");
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
        });
    } else {
        // TODO

    }
});