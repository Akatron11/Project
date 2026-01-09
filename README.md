# ShopHub - E-Commerce Microservices Platform

Modern bir mikroservis mimarisi ile oluşturulmuş tam özellikli e-ticaret platformu.

## 🏗 Mimari

```
┌──────────────────┐
│  React Frontend  │ :5173
│   (Vite + TS)    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   API Gateway    │ :9000
│   (Express.js)   │
└────────┬─────────┘
         │
    ┌────┴────┬────────────┐
    ▼         ▼            ▼
┌────────┐ ┌────────┐ ┌────────┐
│ User   │ │Product │ │ Order  │
│Service │ │Service │ │Service │
│:3000   │ │:5000   │ │:8080   │
│Node.js │ │Flask   │ │Spring  │
└────┬───┘ └────┬───┘ └────┬───┘
     │          │          │
     ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐
│MongoDB │ │Postgres│ │ MySQL  │
│:27017  │ │:5432   │ │:3306   │
└────────┘ └────────┘ └────────┘
                │          │
                ▼          ▼
          ┌──────────┐ ┌────────────┐
          │Elastic   │ │ RabbitMQ   │
          │Search    │ │:5672,:15672│
          │:9200     │ └────────────┘
          └──────────┘
```

## 🛠 Teknolojiler

| Servis | Teknoloji | Port |
|--------|-----------|------|
| Frontend | React + Vite + TypeScript | 5173 |
| API Gateway | Node.js + Express | 9000 |
| User Service | Node.js + Express + MongoDB | 3000 |
| Product Service | Python + Flask + PostgreSQL | 5000 |
| Order Service | Java + Spring Boot + MySQL | 8080 |
| Message Broker | RabbitMQ | 5672, 15672 |
| Search Engine | Elasticsearch | 9200 |

## 🚀 Başlangıç

### 1. Docker ile Tüm Servisleri Başlat
```bash
docker-compose up -d --build
```

### 2. Veritabanlarını Seed Et
```bash
# Ürünleri ekle
docker-compose exec -T product-service python seed_products.py

# Ürün görsellerini ekle
docker-compose exec -T product-service python update_images.py
```

### 3. Frontend'i Başlat
```bash
cd e-commerce-frontend
npm install
npm run dev
```

### 4. Tarayıcıda Aç
- Frontend: http://localhost:5173
- RabbitMQ Dashboard: http://localhost:15672 (guest/guest)

## 📁 Proje Yapısı

```
proje/
├── api-gateway/         # Express.js API Gateway
├── user-service/        # Node.js kullanıcı servisi (MongoDB)
├── product-service/     # Flask ürün servisi (PostgreSQL)
├── order-service/       # Spring Boot sipariş servisi (MySQL)
├── e-commerce-frontend/ # React frontend
├── e-commerce-backend/  # (Kullanılmayan FastAPI alternatifi)
├── docker-compose.yml   # Tüm servislerin orchestration'ı
└── README.md
```

## 🔗 API Endpoints

### User Service (`/api/users`)
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| POST | /register | Yeni kullanıcı kaydı |
| POST | /login | Kullanıcı girişi (JWT) |

### Product Service (`/api/products`)
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | / | Tüm ürünleri listele |
| GET | /?q=laptop | Ürün ara |
| POST | / | Yeni ürün ekle |

### Order Service (`/api/orders`)
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | / | Tüm siparişler |
| GET | /{id} | Sipariş detayı |
| GET | /user/{userId} | Kullanıcı siparişleri |
| POST | / | Yeni sipariş |
| PUT | /{id} | Sipariş güncelle |
| DELETE | /{id} | Sipariş iptal |

## 🧪 Test

```bash
# Ürünleri test et
curl http://localhost:9000/api/products

# Kullanıcı kaydı
curl -X POST http://localhost:9000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username": "test@test.com", "password": "123456"}'

# Sipariş oluştur
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{"userId": "user1", "productId": "1", "quantity": 2, "totalPrice": 100}'
```

## 📊 Özellikler

- ✅ Kullanıcı kayıt ve giriş (JWT)
- ✅ 20 ürün ile ürün listeleme
- ✅ Gerçek ürün görselleri
- ✅ Arama ve filtreleme
- ✅ Sipariş oluşturma (RabbitMQ ile stok güncelleme)
- ✅ Responsive tasarım
- ✅ Sepet işlemleri

## 🐳 Docker Servisleri

```bash
# Durumu kontrol et
docker-compose ps

# Logları gör
docker-compose logs -f [servis-adı]

# Yeniden başlat
docker-compose restart [servis-adı]

# Durdur
docker-compose down
```
