var express = require('express');
var router = express.Router();
//var session = require('express-session');

function requireLogin(req, res, next) {
  const { session, username } = req;
  session && username ? next() : res.redirect('/users/login');
}

/* GET home page. */
router.get('/', requireLogin, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Logout route
router.get('/logout', function(req, res, next) {
  // Destroy the session
  req.session.destroy(function(err) {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/users/login');
  });
});

module.exports = router;
 