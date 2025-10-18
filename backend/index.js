// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple route
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(process.env.PORT || 8080, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT || 8080}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
