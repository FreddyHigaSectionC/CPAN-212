import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import recipes_router from "./routers/recipes_router.js"

// Variables
dotenv.config()
const app = express();
const PORT = process.env.PORT || 6000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // HTML Forms

// Start up
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB is connected")
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  });

// Routes
app.use("/recipe", recipes_router)