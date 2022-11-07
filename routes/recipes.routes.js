const Recipe = require("../models/Recipe.model");

const router = require("express").Router();

//GET my profile page
router.get("/myprofilepage", (req, res, next) => {
  console.log(req.session)
  if (req.session.user) {
    res.render("recipes/myprofilepage", {user:req.session.user})
  } else {
    res.redirect('/auth/login')
  }
}) 


/* GET search page */
router.get("/search", (req, res, next) => {
  res.render("recipes/search")
})

/* GET new recipe form page */
router.get("/create", (req, res, next) => {
  res.render("recipes/create")
})


/* POST new recipe from Create form page to My profile page */ 
router.post('/create', async (req, res) => {
    try {
      await Recipe.create({
        name: req.body.name,
        ingredients: req.body.ingredients.split(''),
        instructions: req.body.instructions,
        cooktime: req.body.cooktime,
        level: req.body.level,
        dishType: req.body.dishType,
        foodtypetag: req.body.foodtypetag,
        nationaltypetag: req.body.nationaltypetag,
      })
      res.redirect('/recipes/myprofilepage')
    } catch (error) {
        console.log(req.body.name)
        console.log(error)
      res.render('recipes/create')
        console.log('render the recipe creation form view so the user can try again')
    }
  })



module.exports = router;