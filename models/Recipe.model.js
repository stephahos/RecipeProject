const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
  {
    title: {
      type: String,
    },
    ingredient: {
      type: String,
  },
}
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
