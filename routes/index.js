var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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
 