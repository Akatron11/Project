const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes"); 
require('dotenv').config();

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://db-users:27017/users_db";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ User Service: MongoDB bağlantısı başarılı!"))
  .catch((err) => console.error("❌ Bağlantı hatası!", err.message));

app.use("/", authRoutes); // Gateway uyumu için "/"

module.exports = app;