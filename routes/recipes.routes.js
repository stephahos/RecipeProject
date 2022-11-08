const Recipe = require("../models/Recipe.model");
const router = require("express").Router();
const uploader = require('../config/cloudinary.config');

//GET my profile page
router.get("/myprofilepage", async(req, res, next) => {
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
      res.redirect('/recipes/allRecipes')
    } catch (error) {

        console.log(error)
      res.render('recipes/create')
        console.log('render the recipe creation form view so the user can try again')
    }
  })

//Get Update recipe page
router.get('/allRecipes/:recipeId/update', async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId)
  res.render('recipes/update', { recipe })
})

router.post('/allRecipes/:recipeId/update', async (req, res) => {
  const recipeCreator = await Recipe.findById(req.params.recipeId).populate("creator")
  if (req.session.user._id === recipeCreator.creator._id.toString()) {
  await Recipe.findByIdAndUpdate(req.params.recipeId, { ...req.body, name: req.body.name, ingredients: req.body.ingredients, instructions: req.body.instructions, cooktime: req.body.cooktime, 
    level: req.body.level, dishType: req.body.dishType, foodtypetag: req.body.foodtypetag, nationaltypetag: req.body.nationaltypetag })
  res.redirect(`/recipes/allRecipes/${req.params.recipeId}`)
}})

//To Delete a recipe
router.get('/allRecipes/:recipeId/delete', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.recipeId)
    res.redirect('/recipes/allRecipes')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;