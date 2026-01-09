# Order Service

Java Spring Boot tabanlı sipariş yönetim servisi.

## 🔧 Özellikler

- Sipariş CRUD işlemleri
- RabbitMQ ile asenkron stok güncelleme
- MySQL veritabanı
- JWT korumalı endpoint'ler

## 🚀 Çalıştırma

```bash
# Docker ile
docker-compose up -d order-service

# Manuel
mvn spring-boot:run
```

## 🔗 API Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | /api/orders | Tüm siparişler |
| GET | /api/orders/{id} | Sipariş detayı |
| GET | /api/orders/user/{userId} | Kullanıcı siparişleri |
| POST | /api/orders | Yeni sipariş |
| PUT | /api/orders/{id} | Sipariş güncelle |
| DELETE | /api/orders/{id} | Sipariş iptal |

## 📝 Request/Response

### Create Order
```json
POST /api/orders
{
  "userId": "user123",
  "productId": "1",
  "quantity": 2,
  "totalPrice": 70000
}

Response:
{
  "id": 1,
  "userId": "user123",
  "productId": "1",
  "quantity": 2,
  "totalPrice": 70000,
  "status": "CREATED"
}
```

### Order Statuses
- `CREATED`: Yeni oluşturuldu
- `SHIPPED`: Kargoya verildi
- `CANCELLED`: İptal edildi

## ⚙️ Ortam Değişkenleri

- `SPRING_DATASOURCE_URL`: MySQL bağlantı adresi
- `SPRING_RABBITMQ_HOST`: RabbitMQ host
