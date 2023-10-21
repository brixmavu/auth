var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var mysql = require('mysql');

const config = require('../config')

// Create a MySQL connection pool
const pool = mysql.createPool(config);

/* GET login. */
router.get('/login', function (req, res, next) {
  res.render("login")
});
 
/* POST login. */
router.post('/login', function (req, res, next) {
  const { email, password } = req.body;

  pool.getConnection(function (err, connection) {
    if (err) {
      console.error('Error acquiring connection from pool:', err);
      return res.render('login', { error: 'An error occurred. Please try again later.' });
    }

    connection.query('SELECT * FROM users WHERE email = ?', email, function (err, results) {
      connection.release();

      if (err) {
        console.error('Error during user login:', err);
        return res.render('login', { error: 'Login failed. Please try again.' });
      }

      if (results.length === 0) {
        return res.render('login', { error: 'Invalid email or password.' });
      }

      const user = results[0];
      bcrypt.compare(password, user.password, function (err, match) {
        if (err) {
          console.error('Error during password comparison:', err);
          return res.render('login', { error: 'An error occurred. Please try again later.' });
        }

        if (!match) {
          return res.render('login', { error: 'Invalid email or password.' });
        }

        req.session.authenticated = true; // Set the session as authenticated
        req.session.user = user;
        res.redirect('/'); // Redirect to the home page upon successful login
      });
    });
  });
});

/* GET register. */
router.get('/register', function (req, res, next) {
  res.render("register")
});

router.post('/register', function (req, res, next) {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, function (err, hashedPassword) {
    if (err) {
      console.error('Error during password hashing:', err);
      return res.render('register', { error: 'An error occurred. Please try again later.' });
    }

    const newUser = {
      email,
      password: hashedPassword,
    };

    pool.getConnection(function (err, connection) {
      if (err) {
        console.error('Error acquiring connection from pool:', err);
        return res.render('register', { error: 'An error occurred. Please try again later.' });
      }

      connection.query('INSERT INTO users SET ?', newUser, function (err, results) {
        connection.release();

        if (err) {
          console.error('Error during user register:', err);
          return res.render('register', { error: 'register failed. Please try again.' });
        }

        res.redirect('/users/login'); 
      });
    });
  });
});

module.exports = router;
