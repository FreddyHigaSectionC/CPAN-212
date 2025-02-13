import express from "express";
import cors from "cors";
import multer from "multer";

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads/'));
  },
  filename: function (req, file, cb) {
    const uniquePreflix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniquePreflix + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })



const app = express();
const PORT = process.env.PORT || 8000;

// Middlelware
app.use(cors());
app.use(express.urlencoded({ extended: true })); // for HTML Forms
app.use(express.json()); // extracts application/json data, OLD method was bodyparser

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

// Send data
app.get("/data", (req, res) => {
  const data = {
    fname: "Freddy",
    lname: "Higa"
  }
  res.send(data);
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.send("I stole your data");
})

// New stuff duting Lab session

app.post("/fileform", upload.single("file"), (req, res) => {
  console.log(req.file)
  console.log(req.body)
  res.json("I received your information")
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});