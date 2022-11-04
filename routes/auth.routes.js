const router = require("express").Router();

const User = require('../models/User.model')
const app = require('../app')


/* GET Signup page */
router.get('/signup', (req, res) => {
    res.render('auth/signup')
  })


  /* GET Login page */
router.get('/login', (req, res) => {
  res.render('auth/login')
})


  module.exports = router;