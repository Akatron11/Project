const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());

// MongoDB sadece run edilince bağlanır
mongoose.connect(process.env.MONGO_URI || "")
  .catch(() => console.log("MongoDB not connected (expected)"));

app.use("/api/auth", authRoutes);

module.exports = app;
