//jshint node: true, esversion: 6

var indexController = {};

const db = require('../config/postgres');

const Company = require('../model/company');
const Employee = require('../model/employee');

indexController.homepage = (req, res, next) => {
  res.render('index', {
      message: req.flash("loginMessage")
  });
};

indexController.firm = (req, res) => {
    var firms = req.firms || firms;

    Company.findAll().then((data) => {
        res.render('firm.ejs', {
            // firms: data
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

indexController.worker = (req, res) => {
    var user = req.session.passport.user || user;

    console.log("req.session");
    console.log(req.session);
    console.log("req.session.passport.user");
    console.log(req.session.passport.user);

    const userString = 'SELECT id, id_adres, id_list_skills, first_name, last_name, ' +
                        'birth, phone_number, image, ' +
                        'email, password FROM "Employee" WHERE id=' + user.id;
    const adresString = 'SELECT country, city, street, house_number, zip_code ' +
                        'FROM "Adres" WHERE id=' + user.id_adres;
    const workingString = 'SELECT wh.id_company AS company, wh.id_emplyee, ' +
                        'wh.from, wh.to, wh.description ' +
                        'FROM "Work_History" AS wh WHERE id_emplyee=' + user.id;

    db.any(userString, [true])
    .then((data) => {
        user = data[0];

        db.any(adresString, [true])
        .then((data2) => {
            adres = data2[0];

            db.any(workingString, [true])
            .then((data3) => {
                workHistory = data3[0];

                user.type = "worker";
                res.render('worker.ejs', {
                    user: user,
                    adres: adres,
                    workHistory : workHistory
                });
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
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
    console.log("req.session");
    console.log(req.session);

    res.render('signup.ejs', {
        message: req.flash('signupMessage')
    });
};

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
            console.log('email is already exists');
            // res.render('signup.ejs', {
            //     message: req.flash('email is already exists')
            // });

        }).catch((error) => {
            if(error.code === 0) {
                req.body.birth = new Date('01/01/1970');
                req.body.phone_number = "+48720463920";
                Employee.createEmployee(req.body);
            }
        });
    } else {
        Company.getHashByEmail(req.body.email).then((data) => {

            console.log('email is already exists');
            // res.render('signup.ejs', {
            //     message: req.flash('email is already exists')
            // });

        }).catch((error) => {
            if(error.code === 0) {
                req.body.name = req.body.firmName;
                req.body.specialization = "specialization for new company";
                req.body.description = "description for new company";

                Company.createCompany(req.body);
            }
        });
    }

    res.render('signup.ejs', {
        message: req.flash('signupMessage')
    });
};

indexController.logout = (req, res) => {
    res.clearCookie('remember');
    req.logout();
    global.user = null;
    res.redirect('/');
};

module.exports = indexController;
