// Imports
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import book_router from "./routers/book_router.js";
import user_router from "./routers/user_router.js";
// import Book from "./models/book.js";

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


// app.get("/", (req, res) => {
//   // 1 - fetch from DB
//   // 2 - send to client
//   Book.find().then((results) => {
//     res.json(results);
//   });
// })

// Routes
app.use("/book", book_router);
app.use("/user", user_router);