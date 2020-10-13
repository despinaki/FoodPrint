const express = require('express');
const db = require('../db/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const { getUserByEmailOrUsername, createUser } = require('../db/queries');
const { validateUser } = require('./helpers');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: "🔐"
  })
});

router.post('/register', (req, res, next) => {
  if(validateUser(req.body)) {
    db.run(getUserByEmailOrUsername, [req.body.email, req.body.username])
      .then(resp => {
        console.log(resp.rows[0])
        if(!resp.rows[0]) {
          bcrypt.hash(req.body.password, 8)
            .then((hash) => {
              db.run(createUser, [req.body.username, req.body.email, hash])
                .then(user => {
                  console.log(user.rows)
                  res.json({
                    status: 201,
                    message: "✅"
                  })
                })
            })
        } else {
          next(new Error('This username or email is already taken.'))
        }
      })
  } else {
    next(new Error('Invalid user'));
  }
})

router.post('/login', (req, res, next) => {
  if(validateUser(req.body)) {
    db.run(getUserByEmail, [req.body.username])
      .then(resp => {
        if(resp.rows[0]) {
          bcrypt.compare(req.body.password, resp.rows[0].password)
            .then((result) => {
              if(result) {
                const Token = jwt.sign({name: req.body.username}, 'shhh', {expiresIn: '1h'})
                res.json({
                  accessToken: Token,
                  user_id: resp.rows[0].userid,
                  message: 'Logged in! :unlock:'
                })
              } else {
                next(new Error('Wrong password'))
              }
            })
        } else {
          next(new Error('Username not found'))
        }
      })
  } else {
    next(new Error('Invalid login'))
  }
})

module.exports = router;
