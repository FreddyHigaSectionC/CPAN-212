import mongoose from "mongoose";

// Connect to the table
const recipeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      required: true
    },
    ingredients: [{
      type: String,
      required: true
    }],
    steps: [{
      type: String,
      required: true
    }],
  }
)

const Recipe = mongoose.model("recipe", recipeSchema);
export default Recipe;