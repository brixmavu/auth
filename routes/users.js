var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var mysql = require('mysql');
var config = require('../config');

// Create a MySQL connection pool
var pool = mysql.createPool(config);

// GET login page
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

// POST login data
router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  // Perform login logic
  pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).send('Internal Server Error');
    }

    var query = 'SELECT * FROM users WHERE email = ?';
    var values = [email];

    connection.query(query, values, function(err, results) {
      connection.release(); // Release the connection

      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).send('Internal Server Error');
      }

      if (results.length === 1) {
        var hashedPassword = results[0].password;
        bcrypt.compare(password, hashedPassword, function(err, isMatch) {
          if (err) {
            console.error('Error comparing passwords:', err);
            return res.status(500).send('Internal Server Error');
          }
          if (isMatch) {
            //res.send('Login successful');
            res.render('index', {
              title: 'Express',
              session: req.session
            })
          } else {
            res.send('Invalid email or password');
          }
        });
      } else {
        res.send('Invalid email or password');
      }
    });
  });
});

// GET registration page
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

// POST registration data
router.post('/register', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  // Hash the password
  bcrypt.hash(password, 10, function(err, hashedPassword) {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Perform registration logic
    pool.getConnection(function(err, connection) {
      if (err) {
        console.error('Error getting MySQL connection:', err);
        return res.status(500).send('Internal Server Error');
      }

      var query = 'INSERT INTO users (email, password) VALUES (?, ?)';
      var values = [email, hashedPassword];

      connection.query(query, values, function(err, results) {
        connection.release(); // Release the connection

        if (err) {
          console.error('Error executing MySQL query:', err);
          return res.status(500).send('Internal Server Error');
        }

        //res.send('Registration successful');
        res.render('login', {
          title: 'Login',
        })
      });
    });
  });
});

module.exports = router;