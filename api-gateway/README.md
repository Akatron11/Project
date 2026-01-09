# API Gateway

Express.js tabanlı API Gateway servisi. Tüm frontend isteklerini ilgili mikroservislere yönlendirir.

## 🔧 Özellikler

- HTTP Proxy (http-proxy-middleware)
- JWT Token doğrulama
- CORS desteği
- Route yönlendirme

## 🚀 Çalıştırma

```bash
# Docker ile
docker-compose up -d api-gateway

# Manuel
npm install
npm start
```

## 🔗 Yönlendirmeler

| Route | Hedef Servis | Port |
|-------|-------------|------|
| `/api/users/*` | user-service | 3000 |
| `/api/products/*` | product-service | 5000 |
| `/api/orders/*` | order-service | 8080 |

## ⚙️ Ortam Değişkenleri

- `PORT`: Gateway portu (varsayılan: 9000)
- `JWT_SECRET`: JWT doğrulama anahtarı
