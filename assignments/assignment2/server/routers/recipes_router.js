import express from "express";
import Recipe from "../models/recipe.js";

const router = express.Router();

// Fetch all
router.get("/", (req, res) => {
  Recipe.find().then((recipes) => {
    res.json(recipes);
  });
});

// Fetch add recipe
router.post("/addRecipe", (req, res) => {
  const { name, description, difficulty, ingredients, steps } = req.body;

  if (!name || !description || !difficulty || !ingredients || !steps) {
    return res.status(400).json({ error: "All fields are required" })
  }

  let newRecipe = new Recipe({
    name,
    description,
    difficulty,
    ingredients,
    steps
  })

  newRecipe.save().then(() => {
    res.json({ message: "Recipe added successfully!" })
  })
})

// Fetch by id
router.get("/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json(recipe);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
});

// Fetch edit recipe
router.put("/:id", (req, res) => {
  const { name, description, difficulty, ingredients, steps } = req.body;

  if (!name || !description || !difficulty || !ingredients || !steps) {
    return res.status(400).json({ error: "All fields are required" });
  }

  Recipe.findByIdAndUpdate(
    req.params.id,
    { name, description, difficulty, ingredients, steps },
    { new: true }  // Return the updated document
  )
    .then((updatedRecipe) => {
      if (!updatedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json({ message: "Update successful", updatedRecipe });
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
});

// Fetch delete
router.delete("/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json({ message: "Delete successful" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
});

export default router;
