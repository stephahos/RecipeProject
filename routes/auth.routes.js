const router = require("express").Router();
const User = require('../models/User.model')
const app = require('../app')
const bcrypt = require("bcryptjs");
const { isConnected, isLoggedOut} = require("../middleware/route-guard")
/*
  let isConnected = false
  if (req.session.user) {
    isConnected = true
  }
  res.render('index', { isConnected })
})
*/

/* GET Signup page */
router.get('/signup',isLoggedOut, (req, res) => {
    res.render('auth/signup')
  });

/* POST Signup data */ 
router.post('/signup', async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })
    res.redirect('/auth/login')
  } catch (error) {
    console.log(error.message)
    res.render('auth/signup', { errorMessage: error.message })
  }
})

  /* GET Login page */
  router.get('/login', (req, res) => {
    res.render(('auth/login'))
  });

/*POST Login page */
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (!user) {
    // What to do if I don't have a user with this username
    res.render('auth/login', { errorMessage: 'No user with this username'})
  } else {
    console.log('Found User', user)
    if (bcrypt.compareSync(password, user.password)) {
      console.log('Correct password')
    // What to do if I have a user and the correct password
      
      delete user.password
      console.log("before login" , req.session)
      req.session.user = user
      console.log("after",req.session)
      res.redirect('/recipes/myprofilepage')
    } else {
      // What to do if I have a user and an incorrect password
      res.render('auth/login', { errorMessage: 'Incorrect password !!!'})
    }
  }
})

router.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err)
    }
    res.redirect('/auth/login')
  })
})

  module.exports = router;