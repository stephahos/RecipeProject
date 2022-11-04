const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
     type: String,
    required: true,
    },
    cooktime: {
    type: Number,
    },
    level: {
    type: String,
    enum: ['Easy', 'Amateur Chef','Master Chef']
    },
    dishType: {
      type: String,
      enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
      },
    foodtypetag: {
      type: String,
      enum: ['Vegan', 'Vegatarian','Gluten-Free']
    },
    nationaltypetag: {
      type: String,
      enum: ['Asian', 'TexMex','Italian']
    },
    /* image: {
      type: String,
      default: 'aubergines.jpg'
    },
    /*creator: {
      type: Schema.Types.ObjectId,ref:'User',
      required: true,
    },*/
    
 },
{
  timestamps : true
}
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
