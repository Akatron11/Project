const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
require('dotenv').config(); // .env dosyasındaki değişkenleri okumak için ŞART

const app = express();
app.use(express.json());

// MongoDB Bağlantı Ayarı
// Docker ile ayağa kalkan MongoDB'nin varsayılan adresi:
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/users_db";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ User Service: MongoDB bağlantısı başarılı!"))
  .catch((err) => {
      console.error("❌ User Service: MongoDB bağlantı hatası!", err.message);
      process.exit(1); // Bağlantı yoksa servisi durdur ki hata olduğunu anlayalım
  });

// Rotalar
app.use("/api/auth", authRoutes);

// Test Rotası
app.get("/", (req, res) => res.send("User Service Ayakta!"));

module.exports = app;