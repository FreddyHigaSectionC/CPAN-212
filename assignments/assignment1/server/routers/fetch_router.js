import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

router.get("/single/:filename", (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, "../uploads", filename);
  res.sendFile(imagePath);
});

router.get("/multiple/:category", (req, res) => {

  const category = req.params.category || "default";
  const upload_directory = path.join(__dirname, "../uploads", category);

  if (!fs.existsSync(upload_directory)) {
    return res.status(404).json({ message: `Category '${category}' not found` });
  }

  const files_array = fs.readdirSync(upload_directory);

  if (files_array.length == 0) {

    return res.status(503).send({
      message: "No images",
    });
  }

  res.json(files_array);
});

export default router;