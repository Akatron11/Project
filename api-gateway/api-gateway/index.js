const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());

const PORT = 5000;
const JWT_SECRET = "fisek_gibi_proje_2026"; // User Service ile aynı olmalı

// --- GÜVENLİK BEKÇİSİ (JWT Middleware) ---
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    // Login ve Register için token sorma
    if (req.path.includes('/api/auth')) return next();

    if (!token) {
        return res.status(403).json({ message: "Yetkisiz erişim! Token eksik." });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Geçersiz veya süresi dolmuş token!" });
    }
};

// --- SERVİS ADRESLERİ ---
const services = {
    users: 'http://localhost:3000',
    products: 'http://localhost:8000',
    orders: 'http://localhost:8080'
};

// --- YÖNLENDİRMELER ---

// Auth/User işlemleri (Şifresiz geçebilir)
app.use('/api/users', createProxyMiddleware({ 
    target: services.users, 
    changeOrigin: true, 
    pathRewrite: { '^/api/users': '' } 
}));

// Ürünler (Token kontrolü eklendi)
app.use('/api/products', verifyToken, createProxyMiddleware({ 
    target: services.products, 
    changeOrigin: true, 
    pathRewrite: { '^/api/products': '' } 
}));

// Siparişler (Kesinlikle Token gerektirir)
app.use('/api/orders', verifyToken, createProxyMiddleware({ 
    target: services.orders, 
    changeOrigin: true, 
    pathRewrite: { '^/api/orders': '' } 
}));

app.get('/', (req, res) => res.send('🚀 API Gateway Güvenlikli Modda Çalışıyor!'));

app.listen(PORT, () => {
    console.log(`🚀 Gateway http://localhost:${PORT} portunda bekçilik yapıyor!`);
});