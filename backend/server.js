import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import connectDB from "./config/db.js";
import wasteRoutes from "./routes/wasteRoutes.js";
import waterRoutes from "./routes/waterRoutes.js";

dotenv.config();
connectDB();

// Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/uploads", express.static("uploads"));

// Simple logger (optional)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/waste", wasteRoutes);
app.use("/api/water", waterRoutes);

// Fallback route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
