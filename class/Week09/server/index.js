// Imports
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import book_router from "./routers/book_router.js";

// Variables
dotenv.config()
const app = express();
const PORT = process.env.PORT || 6000;

// Middleware


// Routes
app.get("/", (req, res) => {
  // 1 - fetch from DB
  // 2 - send to client
  Book.find().then((results) => {
    res.json(results);
  });
})

// Start up
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB is connected")
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  });

// Routes
app.use("/book", book_router);