# Product Service

Python Flask tabanlı ürün yönetim servisi.

## 🔧 Özellikler

- Ürün listeleme ve arama
- Kategori ve fiyat filtreleme
- Stok yönetimi
- Elasticsearch entegrasyonu
- RabbitMQ consumer (stok güncelleme)

## 🚀 Çalıştırma

```bash
# Docker ile
docker-compose up -d product-service

# Ürünleri seed et
docker-compose exec -T product-service python seed_products.py

# Görselleri ekle
docker-compose exec -T product-service python update_images.py
```

## 🔗 API Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | /products | Tüm ürünler |
| GET | /products?q=laptop | Arama |
| GET | /products?category_id=1 | Kategori filtresi |
| GET | /products?min_price=100&max_price=500 | Fiyat filtresi |
| POST | /products | Yeni ürün ekle |
| GET | /products/search | Elasticsearch arama |
| GET | /categories | Kategoriler |
| GET | /health | Sağlık kontrolü |

## 📝 Response Örneği

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "price": 35000.0,
    "stock": 10,
    "image_url": "https://images.unsplash.com/..."
  }
]
```

## ⚙️ Ortam Değişkenleri

- `DATABASE_URL`: PostgreSQL bağlantı adresi
- `RABBITMQ_HOST`: RabbitMQ host
- `ELASTICSEARCH_URL`: Elasticsearch adresi
