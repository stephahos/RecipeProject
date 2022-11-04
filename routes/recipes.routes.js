const router = require("express").Router();

/* GET search page */
router.get("/search-recipes", (req, res, next) => {
    res.render("recipes/search")
})







module.exports = router;