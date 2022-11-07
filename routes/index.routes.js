const express = require('express');
const router = express.Router();

//GET home page
router.get("/", (req, res, next) => {
  res.render("index");
})

/* router.get('/', (req, res, next) => {
  let isConnected = false
  const currentUser = User.findOne({ username })
  req.session.user = currentUser
  if (currentUser) {
    isConnected = true
  }
  res.render('index', { isConnected })
})*/


module.exports = router;
