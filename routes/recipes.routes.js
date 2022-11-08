const Recipe = require("../models/Recipe.model");
const router = require("express").Router();
const uploader = require('../config/cloudinary.config');

//GET my profile page
router.get("/myprofilepage", async(req, res, next) => {
  console.log(req.session)
  //const Recipes = await Recipe.find()
  if (req.session.user) {
    res.render("recipes/myprofilepage", {user:req.session.user})
  } else {
    res.redirect('/auth/login')
  }
}) 

/* GET All Recipes page */
router.get('/allRecipes', async (req, res, next) => {
  try {
    const Recipes = await Recipe.find()
    res.render('recipes/allRecipes', { Recipes })

  } catch (err) {
    console.log(err)
  }
})

//Get Recipe by ID => Recipe Details
router.get('/allRecipes/:recipeId', async (req, res, next) => {
  console.log(req.params.recipeId)
  const recipe = await Recipe.findById(req.params.recipeId)
  res.render('recipes/recipe-details', { recipe })
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
router.post('/create', uploader.single("imageUrl"),  async (req, res) => {
  console.log(req.body , req.file)
    try {
      await Recipe.create({
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        cooktime: req.body.cooktime,
        level: req.body.level,
        dishType: req.body.dishType,
        foodtypetag: req.body.foodtypetag,
        nationaltypetag: req.body.nationaltypetag,
        creator: req.session.user._id,
        image: req.file.path,
      })
      res.redirect('/recipes/myprofilepage')
    } catch (error) {
        console.log(req.body.name)
        console.log(error)
      res.render('recipes/create')
        console.log('render the recipe creation form view so the user can try again')
    }
  })

//to Update a recipe
router.get('/update/:recipeId', async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId)
  res.render('updated-movie', { recipe })
})

router.post('/update/:recipeId', async (req, res) => {
  console.log(req.body)
  await Recipe.findByIdAndUpdate(req.params.recipeId, { ...req.body, name: req.body.name })
  res.redirect(`/recipes/${req.params.recipeId}`)
})







module.exports = router;