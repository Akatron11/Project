# User Service

Node.js + Express tabanlı kullanıcı yönetim servisi.

## 🔧 Özellikler

- Kullanıcı kayıt
- Kullanıcı giriş (JWT token)
- MongoDB veritabanı

## 🚀 Çalıştırma

```bash
# Docker ile
docker-compose up -d user-service

# Manuel
npm install
npm start
```

## 🔗 API Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| POST | /register | Yeni kullanıcı kaydı |
| POST | /login | Kullanıcı girişi |

## 📝 Request/Response

### Register
```json
POST /register
{
  "username": "user@example.com",
  "password": "password123"
}

Response: { "message": "Başarıyla kayıt oldun kuzen!" }
```

### Login
```json
POST /login
{
  "username": "user@example.com",
  "password": "password123"
}

Response: { "token": "eyJhbG..." }
```

## ⚙️ Ortam Değişkenleri

- `PORT`: Servis portu (varsayılan: 3000)
- `MONGO_URI`: MongoDB bağlantı adresi
