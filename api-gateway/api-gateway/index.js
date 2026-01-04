const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 5000;

// Servislerin adresleri (Lokalde çalıştıkları portlar)
const services = {
    users: 'http://localhost:3000',    // Senin Node.js servis
    products: 'http://localhost:8000', // Senin Python servis
    orders: 'http://localhost:8080'    // Senin Java servis
};

// YÖNLENDİRMELER
app.use('/api/users', createProxyMiddleware({ target: services.users, changeOrigin: true, pathRewrite: { '^/api/users': '' } }));
app.use('/api/products', createProxyMiddleware({ target: services.products, changeOrigin: true, pathRewrite: { '^/api/products': '' } }));
app.use('/api/orders', createProxyMiddleware({ target: services.orders, changeOrigin: true, pathRewrite: { '^/api/orders': '' } }));

app.get('/', (req, res) => res.send('API Gateway Çalışıyor!'));

app.listen(PORT, () => {
    console.log(`🚀 Gateway http://localhost:${PORT} adresinde fişek gibi çalışıyor!`);
});