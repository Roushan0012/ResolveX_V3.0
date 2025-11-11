import express from "express";
import multer from "multer";
import { createWasteReport } from "../controllers/wasteController.js";

const router = express.Router();

// Configure multer for media upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save inside backend/uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// POST /waste/report
router.post("/report", upload.array("media", 5), createWasteReport);

export default router;
