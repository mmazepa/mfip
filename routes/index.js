//jshint node: true, esversion: 6

const express = require('express');
const router = express.Router();
const Company = require('../model/company');

var pgp = require('pg-promise')();
var db = pgp("postgres://postgres:postgres@localhost:5432/mfip");

var session;
router.get('/', function(req, res, next)
{
  session = req.session || session;

  // db.one('SELECT * FROM "Employee" WHERE email=\'' + req.email + '\'', [true])
  // .then(function(data)
  // {
  //     console.log(data);
  //     res.render('workers.ejs',
  //     {
  //         session: session,
  //         activeUser: data
  //     });
  // })
  // .catch(function(error)
  // {
  //     console.log(error);
  // });

  res.render('index',
  {
      session: req.session,
      message: req.flash("loginMessage")
  });
});

router.get('/firm', function(req,res)
{
    session = req.session || session;
    var firms = req.firms || firms;

    // db.any('SELECT * FROM "Company"', [true])
    // .then(function(data)
    // {
    //     firms = data;
    //     res.render('firm.ejs',
    //     {
    //         session: session,
    //         firms: firms
    //     });
    // })
    // .catch(function(error)
    // {
    //     console.log(error);
    // });

    Company.findAll().then((data) =>
    {
        res.render('firm.ejs',
        {
            session: session,
            firms: data
        });
        //res.json(JSON.stringify(data[0]));
    })
    .catch(function(error)
    {
        console.log(error);
    });
});

router.get('/firms', function(req,res)
{
    session = req.session || session;
    var firms = req.firms || firms;

    db.any('SELECT * FROM "Company"', [true])
    .then(function(data)
    {
        firms = data;
        res.render('crud/firms.ejs',
        {
            session: session,
            firms: firms
        });
    })
    .catch(function(error)
    {
        console.log(error);
    });
});

router.get('/worker', function(req,res)
{
    session = req.session || session;
    var employees = req.employees || employees;

    db.any('SELECT e.first_name, e.last_name, e.birth, e.phone_number, e.email, ' +
            'e.password, a.country, a.city, a.street, a.house_number, a.zip_code, ' +
            'c.name AS company_name, c.specialization, wh.from, wh.to, wh.description ' +
            'FROM "Work_History" AS "wh" INNER JOIN "Company" AS "c" ' +
            'ON wh.id_company = c.id INNER JOIN "Employee" AS "e" ' +
            'ON wh.id_emplyee = e.id INNER JOIN "Adres" AS a ' +
            'ON e.id_adres = a.id WHERE e.last_name=\'Kowalski\'', [true])
    .then(function(data)
    {
        employees = data;
        res.render('worker.ejs',
        {
            session: session,
            employees: employees
        });
    })
    .catch(function(error)
    {
        console.log(error);
    });
});

router.get('/workers', function(req,res)
{
    session = req.session || session;
    var employees = req.employees || employees;

    db.any('SELECT e.first_name, e.last_name, e.birth, e.phone_number, e.email, ' +
            'a.country, a.city, a.street, a.house_number, a.zip_code ' +
            'FROM "Employee" AS e INNER JOIN "Adres" AS a ON e.id_adres = a.id', [true])
    .then(function(data)
    {
        employees = data;
        res.render('crud/workers.ejs',
        {
            session: session,
            employees: employees
        });
    })
    .catch(function(error)
    {
        console.log(error);
    });
});

router.get('/addresses', function(req,res)
{
    session = req.session || session;
    var addresses = req.addresses || addresses;

    db.any('SELECT * FROM "Adres" ORDER BY country, city, street', [true])
    .then(function(data)
    {
        addresses = data;
        res.render('crud/addresses.ejs',
        {
            session: session,
            addresses: addresses
        });
    })
    .catch(function(error)
    {
        console.log(error);
    });
});

router.get('/skills', function(req,res)
{
    session = req.session || session;
    var skills = req.skills || skills;

    db.any('SELECT e.first_name, e.last_name, s.type, s.name, s.description ' +
            'FROM "List_Skills" AS ls INNER JOIN "Employee" AS e ON ls.id_owner = e.id ' +
            'INNER JOIN "Skill" AS s ON ls.id_skill = s.id ' +
            'ORDER BY e.last_name, e.first_name, s.type, s.name', [true])
    .then(function(data)
    {
        skills = data;
        res.render('crud/skills.ejs',
        {
            session: session,
            skills: skills
        });
    })
    .catch(function(error)
    {
        console.log(error);
    });
});

router.get('/workstations', function(req,res)
{
    session = req.session || session;
    var workstations = req.workstations || workstations;

    db.any('SELECT c.name AS company_name, w.name AS workstation_name, ' +
            'w.phone_number, w.email, w.limit, w.description, a.country, ' +
            'a.city, a.street, a.house_number, a.zip_code ' +
            'FROM "Workstation" AS w INNER JOIN "Company" AS c ' +
            'ON w.id_company = c.id INNER JOIN "Adres" AS a ON w.id_adres = a.id', [true])
    .then(function(data)
    {
        workstations = data;
        res.render('crud/workstations.ejs',
        {
            session: session,
            workstations: workstations
        });
    })
    .catch(function(error)
    {
        console.log(error);
    });
});

router.get('/workHistory', function(req,res)
{
    session = req.session || session;
    var workHistory = req.workHistory || workHistory;

    db.any('SELECT c.name, e.first_name, e.last_name, wh.from, wh.to, wh.description ' +
            'FROM "Work_History" AS "wh" INNER JOIN "Company" AS "c" ' +
            'ON wh.id_company = c.id INNER JOIN "Employee" AS "e" ' +
            'ON wh.id_emplyee = e.id', [true])
    .then(function(data)
    {
        console.log(data);
        workHistory = data;
        res.render('crud/workHistory.ejs',
        {
            session: session,
            workHistory: workHistory
        });
    })
    .catch(function(error)
    {
        console.log(error);
    });
});

router.get('/cv', function(req, res)
{
  session = req.session || session;
  res.render('cv/cv.ejs',
  {
      session: session
  });
});

router.get('/cv/edit', function(req, res)
{
  session = req.session || session;
  res.render('cv/editCV.ejs',
  {
      session: session
  });
});

router.get('/signup', function(req, res)
{
  session = req.session || session;
  res.render('signup.ejs',
  {
      message: req.flash('signupMessage'),
      session: session
  });
});

router.get('/logout', function(req, res)
{
  session = req.session || session;
  req.session.destroy(function(err)
  {
      if(err)
      {
          console.log(err);
      }
      else
      {
          session.destroy();
          req.logout();
          res.redirect('/');
      }
  });
});

module.exports = session;
module.exports = router;

function isLoggedIn(req, res, next)
{
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
