const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());

const PORT = 9000; // Çakışma olmaması için 9000 portu idealdir
const JWT_SECRET = "fisek_gibi_proje_2026"; // User Service ile aynı olmalı

// --- GÜVENLİK BEKÇİSİ (JWT Middleware) ---
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    // Login ve Register için token sorma (PDF Gereksinimi)
    if (req.path.includes('/api/auth') || req.path.includes('/login')) return next();

    if (!token) {
        return res.status(403).json({ message: "Yetkisiz erişim! Token eksik." });
    }

    try {
        // Bearer token formatını kontrol eder
        const tokenValue = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
        const decoded = jwt.verify(tokenValue, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Geçersiz veya süresi dolmuş token!" });
    }
};

// --- SERVİS ADRESLERİ (Docker ve Yerel Uyumlu) ---
const services = {
    users: 'http://user-service:3000',    // Node.js User Service
    products: 'http://product-service:5000', // Python Product Service
    orders: 'http://order-service:8080'     // Java Order Service
};

// --- YÖNLENDİRMELER ---

// 1. User/Auth İşlemleri (Token gerekmez)
app.use('/api/users', createProxyMiddleware({ 
    target: services.users, 
    changeOrigin: true,
    pathRewrite: { '^/api/users': '' } 
}));

// 2. Siparişler (Token Kontrolü ŞART - PDF Gereksinimi)
app.use('/api/orders', verifyToken, createProxyMiddleware({ 
    target: services.orders, 
    changeOrigin: true,
    pathRewrite: { '^/api/orders': '/api/orders' } 
}));

// 3. Ürünler (Token Kontrolü ŞART)
app.use('/api/products', verifyToken, createProxyMiddleware({ 
    target: services.products, 
    changeOrigin: true,
    pathRewrite: { '^/api/products': '/api/products' } 
}));

app.listen(PORT, () => {
    console.log(`🚀 API Gateway ${PORT} portunda aktif!`);
    console.log(`👉 Order Service: ${services.orders}`);
    console.log(`👉 Product Service: ${services.products}`);
});