const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save(); // Veritabanına gerçek kayıt
    res.status(201).json({ message: "Başarıyla kayıt oldun kuzen!" });
  } catch (err) {
    res.status(500).json({ error: "Kayıt hatası: " + err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Kullanıcı adı veya şifre hatalı!" });
    }

    const token = jwt.sign({ id: user._id }, "fisek_gibi_proje_2026", { expiresIn: "1h" });
    res.json({ token, message: "Giriş başarılı!" });
  } catch (err) {
    res.status(500).json({ error: "Giriş hatası!" });
  }
};