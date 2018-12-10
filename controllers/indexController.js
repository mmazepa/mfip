//jshint node: true, esversion: 6

var indexController = {};
var session;

var pgp = require('pg-promise')();
var db = pgp("postgres://postgres:postgres@localhost:5432/mfip");
const Company = require('../model/company');

indexController.homepage = (req, res, next) => {
  session = req.session || session;
  res.render('index', {
      session: req.session,
      message: req.flash("loginMessage")
  });
};

indexController.firm = (req, res) => {
    session = req.session || session;
    var firms = req.firms || firms;

    Company.findAll().then((data) => {
        res.render('firm.ejs', {
            session: session,
            firms: data
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

indexController.firms = (req, res) => {
    session = req.session || session;
    var firms = req.firms || firms;

    db.any('SELECT * FROM "Company"', [true])
    .then((data) => {
        firms = data;
        res.render('crud/firms.ejs', {
            session: session,
            firms: firms
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

indexController.worker = (req, res) => {
    session = req.session || session;
    var employees = req.employees || employees;

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
            session: session,
            employees: employees
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

indexController.workers = (req, res) => {
    session = req.session || session;
    var employees = req.employees || employees;

    db.any('SELECT e.first_name, e.last_name, e.birth, e.phone_number, e.email, ' +
            'a.country, a.city, a.street, a.house_number, a.zip_code ' +
            'FROM "Employee" AS e INNER JOIN "Adres" AS a ON e.id_adres = a.id', [true])
    .then((data) => {
        employees = data;
        res.render('crud/workers.ejs', {
            session: session,
            employees: employees
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

indexController.addresses = (req, res) => {
    session = req.session || session;
    var addresses = req.addresses || addresses;

    db.any('SELECT * FROM "Adres" ORDER BY country, city, street', [true])
    .then((data) => {
        addresses = data;
        res.render('crud/addresses.ejs', {
            session: session,
            addresses: addresses
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

indexController.skills = (req, res) => {
    session = req.session || session;
    var skills = req.skills || skills;

    db.any('SELECT e.first_name, e.last_name, s.type, s.name, s.description ' +
            'FROM "List_Skills" AS ls INNER JOIN "Employee" AS e ON ls.id_owner = e.id ' +
            'INNER JOIN "Skill" AS s ON ls.id_skill = s.id ' +
            'ORDER BY e.last_name, e.first_name, s.type, s.name', [true])
    .then((data) => {
        skills = data;
        res.render('crud/skills.ejs', {
            session: session,
            skills: skills
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

indexController.workstations = (req, res) => {
    session = req.session || session;
    var workstations = req.workstations || workstations;

    db.any('SELECT c.name AS company_name, w.name AS workstation_name, ' +
            'w.phone_number, w.email, w.limit, w.description, a.country, ' +
            'a.city, a.street, a.house_number, a.zip_code ' +
            'FROM "Workstation" AS w INNER JOIN "Company" AS c ' +
            'ON w.id_company = c.id INNER JOIN "Adres" AS a ON w.id_adres = a.id', [true])
    .then((data) => {
        workstations = data;
        res.render('crud/workstations.ejs', {
            session: session,
            workstations: workstations
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

indexController.workHistory = (req, res) => {
    session = req.session || session;
    var workHistory = req.workHistory || workHistory;

    db.any('SELECT c.name, e.first_name, e.last_name, wh.from, wh.to, wh.description ' +
            'FROM "Work_History" AS "wh" INNER JOIN "Company" AS "c" ' +
            'ON wh.id_company = c.id INNER JOIN "Employee" AS "e" ' +
            'ON wh.id_emplyee = e.id', [true])
    .then((data) => {
        workHistory = data;
        res.render('crud/workHistory.ejs', {
            session: session,
            workHistory: workHistory
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

indexController.cv = (req, res) => {
  session = req.session || session;
  res.render('cv/cv.ejs', {
      session: session
  });
};

indexController.cvEdit = (req, res) => {
  session = req.session || session;
  res.render('cv/editCV.ejs', {
      session: session
  });
};

indexController.signup = (req, res) => {
  session = req.session || session;
  res.render('signup.ejs', {
      message: req.flash('signupMessage'),
      session: session
  });
};

indexController.logout = (req, res) => {
  session = req.session || session;
  req.session.destroy((err) => {
      if (err) {
          console.log(err);
      } else {
          session.destroy();
          req.logout();
          res.redirect('/');
      }
  });
};

module.exports = indexController;
