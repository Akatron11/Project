const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// Tüm bağlantılara izin ver (CORS hatasını kökten çözer)
app.use(cors());

const PORT = 9000;
const JWT_SECRET = "fisek_gibi_proje_2026";

// --- GÜVENLİK BEKÇİSİ (Middleware) ---
const verifyToken = (req, res, next) => {
    // Kayıt ve Giriş yollarını (register/login) kontrolden muaf tutuyoruz.
    // Eğer istek bu yollara gidiyorsa token sorma, direkt geçsin.
    if (req.path.includes('/register') || req.path.includes('/login')) {
        return next();
    }

    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: "Yetkisiz erişim! Token eksik." });
    }

    try {
        const tokenValue = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
        const decoded = jwt.verify(tokenValue, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Geçersiz token!" });
    }
};

// --- SERVİS ADRESLERİ (DOCKER İSİMLERİ) ---
const services = {
    // Docker Compose dosyasındaki servis adıyla birebir aynı olmalı
    users: 'http://user-service:3000',
    products: 'http://product-service:5000',
    orders: 'http://order-service:8080'
};

// --- YÖNLENDİRMELER (Proxy) ---

// 1. User Service Yönlendirmesi
// Frontend'den gelen /api/users/register isteğini alıp 
// User Service'e /register olarak gönderir.
app.use('/api/users', createProxyMiddleware({
    target: services.users,
    changeOrigin: true,
    pathRewrite: { '^/api/users': '' }, // /api/users kısmını siler, geriye kalanı gönderir
    onProxyReq: (proxyReq, req, res) => {

    }
}));

// 3. Product Service
app.use('/api/products', createProxyMiddleware({
    target: services.products,
    changeOrigin: true,
    pathRewrite: (path, req) => {
        if (path === '/' || path === '') return '/products';
        return '/products' + path;
    }
}));

// 2. Order Service (Siparişler için verifyToken ekledik)
app.use('/api/orders', verifyToken, createProxyMiddleware({
    target: services.orders,
    changeOrigin: true,
    // Order Service zaten /api/orders bekliyor, path'i olduğu gibi ilet
}));

app.listen(PORT, () => {
    console.log(`\n🚀 API Gateway ${PORT} portunda aktif!`);
    console.log(`👉 User Service: ${services.users}`);
});