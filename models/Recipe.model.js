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
    enum: ['Easy', 'Amateur Chef','Master Chef'],
    required: true,
    },
    foodtypetag: {
      type: String,
      enum: ['Vegan', 'Vegetarian','Gluten-Free'],
      required: true,
    },
    nationaltypetag: {
      type: String,
      enum: ['Asian', 'TexMex','Italian', 'Scottish', 'French','Japanese','Indian'],
      required: true,
    },
    image: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref:'User',
    },
 },
{
  timestamps : true
}
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
