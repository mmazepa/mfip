//jshint node: true, esversion: 6

var express = require('express');
var router = express.Router();
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
    res.render('firm.ejs',
    {
        session: session
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
    res.render('worker.ejs',
    {
        session: session
    });
});

router.get('/workers', function(req,res)
{
    session = req.session || session;
    var employees = req.employees || employees;

    db.any('SELECT * FROM "Employee"', [true])
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

    db.any('SELECT * FROM "Adres"', [true])
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

    db.any('SELECT * FROM "Skill"', [true])
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

    db.any('SELECT * FROM "Workstation"', [true])
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
