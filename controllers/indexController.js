//jshint node: true, esversion: 6

var indexController = {};
// var session;

// var pgp = require('pg-promise')();
// var db = pgp("postgres://postgres:postgres@localhost:5432/mfip");

const db = require('../config/postgres');

const Company = require('../model/company');
const Employee = require('../model/employee');

indexController.homepage = (req, res, next) => {
// // //   session = req.session || session;
  res.render('index', {
    // //   session: req.session,
      message: req.flash("loginMessage")
  });
};

indexController.firm = (req, res) => {
    var firms = req.firms || firms;

    Company.findAll().then((data) => {
        res.render('firm.ejs', {
            firms: data
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

indexController.worker = (req, res) => {
    var employees = req.employees || employees;
    
    console.log("req.body");
    console.log(req.session.passport.user);

    db.any('SELECT e.first_name, e.last_name, e.birth, e.phone_number, e.email, ' +
            'e.password, a.country, a.city, a.street, a.house_number, a.zip_code, ' +
            'c.name AS company_name, c.specialization, wh.from, wh.to, wh.description ' +
            'FROM "Work_History" AS "wh" INNER JOIN "Company" AS "c" ' +
            'ON wh.id_company = c.id INNER JOIN "Employee" AS "e" ' +
            'ON wh.id_emplyee = e.id INNER JOIN "Adres" AS a ' +
            'ON e.id_adres = a.id WHERE e.last_name=\'Kowalski\'', [true])
    .then((data) => {
        employees = data;
        res.render('worker.ejs', {
            employees: employees
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

indexController.workstations = (req, res) => {
    var workstations = req.workstations || workstations;

    db.any('SELECT c.name AS company_name, w.name AS workstation_name, ' +
            'w.phone_number, w.email, w.limit, w.description, a.country, ' +
            'a.city, a.street, a.house_number, a.zip_code ' +
            'FROM "Workstation" AS w INNER JOIN "Company" AS c ' +
            'ON w.id_company = c.id INNER JOIN "Adres" AS a ON w.id_adres = a.id', [true])
    .then((data) => {
        workstations = data;
        res.render('crud/workstations.ejs', {
            workstations: workstations
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

indexController.workHistory = (req, res) => {
    var workHistory = req.workHistory || workHistory;

    db.any('SELECT c.name, e.first_name, e.last_name, wh.from, wh.to, wh.description ' +
            'FROM "Work_History" AS "wh" INNER JOIN "Company" AS "c" ' +
            'ON wh.id_company = c.id INNER JOIN "Employee" AS "e" ' +
            'ON wh.id_emplyee = e.id', [true])
    .then((data) => {
        workHistory = data;
        res.render('crud/workHistory.ejs', {
            workHistory: workHistory
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

indexController.cv = (req, res) => {
  res.render('cv/cv.ejs', {
  });
};

indexController.cvEdit = (req, res) => {
  res.render('cv/editCV.ejs', {
  });
};

indexController.signup = (req, res) => {
  res.render('signup.ejs', {
      message: req.flash('signupMessage')
  });
};

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

indexController.signup_post = (req, res) => {
    console.log("req.body");
    console.log(req.body);

    // req.checkBody('email', 'Invalid email').isEmail();
    // let errors = req.validationErrors();
    // if (errors) {
    //     res.render('login', {
    //         errors: errors
    //     });}
    
    if (req.body.type  === 'worker') {
        Employee.getHashByEmail(req.body.email).then((data) => {

            res.render('signup.ejs', {
                message: req.flash('email is already exists'),
                // // session: session
            });

        }).catch((error) => {
            if(error.code === 0) {
                req.body.birth = null;
                req.body.phone_number = null;
                Employee.createEmployee(req.body);
                
            }

        });
    } else {
        console.log("company");
    }

    res.render('signup.ejs', {
        message: req.flash('signupMessage')
    });
};

indexController.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

module.exports = indexController;
