const router = require("express").Router();
const User = require('../models/User.model')
const app = require('../app')
const bcrypt = require("bcryptjs");

/* GET Signup page */
router.get('/signup', (req, res) => {
    res.render('auth/signup')
  });

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  const user = {
    username,
    email,
    passwordHash: hash,
  }
  console.log(user) 

await User.create(user);
res.redirect("/auth/login"); 
});

  //TODO - CHECK IF THE USER EXISTS


  


  /* GET Login page */
router.get('/login', (req, res) => {
  res.render('auth/login')
});



  module.exports = router;