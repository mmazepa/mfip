//jshint node: true, esversion: 6

var express = require('express');

var router = express.Router();

var session;
router.get('/', function(req, res, next)
{
  session = req.session || session;
  res.render('index',
  {
      session: req.session,
      message: req.flash("loginMessage")
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
