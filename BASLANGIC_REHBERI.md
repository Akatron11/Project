# Projeyi Nasıl Çalıştırırım?

Merhaba! Bu rehberde projemizi nasıl ayağa kaldıracağımızı adım adım anlatacağım. Endişelenmeyin, çok basit!

---

## Önce Bunlar Bilgisayarınızda Kurulu Olmalı

1. **Docker Desktop** - Servisleri çalıştırmak için lazım
   - İndirmek için: https://www.docker.com/products/docker-desktop

2. **Node.js** - Frontend için lazım
   - İndirmek için: https://nodejs.org

---

## Başlayalım!

### Adım 1: Docker'ı Aç

Bilgisayarınızda Docker Desktop uygulamasını açın. Sol altta yeşil renkle "Running" yazana kadar bekleyin. Bu 1-2 dakika sürebilir.

### Adım 2: Terminali Aç

Windows'ta PowerShell veya CMD açın.

### Adım 3: Proje Klasörüne Git

Terminale şunu yazın:
```
cd "C:\Users\Akatron\Desktop\software architecture\proje"
```

### Adım 4: Servisleri Başlat

Bu komut tüm backend servislerini başlatır. İlk seferde biraz uzun sürer (5-10 dakika), sabırlı olun:
```
docker-compose up -d --build
```

Bittikten sonra kontrol etmek için:
```
docker-compose ps
```
Hepsinin "Up" durumunda olduğunu görmeniz lazım.

### Adım 5: Veritabanına Ürün Ekle

Ürünlerin görünmesi için bunları çalıştırın:
```
docker-compose exec -T product-service python seed_products.py
docker-compose exec -T product-service python update_images.py
```

### Adım 6: Frontend'i Başlat

Önce frontend klasörüne girin:
```
cd e-commerce-frontend
```

Paketleri yükleyin (ilk seferde biraz sürer):
```
npm install
```

Sonra çalıştırın:
```
npm run dev
```

### Adım 7: Tarayıcıda Aç

Tarayıcınızı açın ve şu adrese gidin:
```
http://localhost:5173
```

Tebrikler! Proje çalışıyor! 🎉

---

## Projeyi Kapatmak İstersen

1. Frontend çalışan terminalde **Ctrl+C** basın
2. Sonra şu komutu çalıştırın:
```
docker-compose down
```

---

## Bir Şey Çalışmıyorsa

| Problem | Ne Yapmalı |
|---------|-----------|
| Ürünler görünmüyor | seed_products.py komutunu tekrar çalıştır |
| Port hatası alıyorum | `docker-compose down` yap, sonra tekrar `up` |
| Docker çalışmıyor | Docker Desktop'ı kapat aç |
| npm hata veriyor | `npm install` komutunu tekrar çalıştır |

---

Herhangi bir sorun olursa bana ulaşabilirsiniz!

---

## VS Code Eklentileri (Önerilen)

Projeyi daha rahat kodlayabilmek için şu eklentileri VS Code'a kurun:

### Mutlaka Kurulması Gerekenler

| Eklenti | Ne İşe Yarar |
|---------|-------------|
| **ES7+ React/Redux/React-Native snippets** | React kodlarken hızlı kısayollar |
| **Prettier - Code formatter** | Kodunuzu otomatik düzenler |
| **ESLint** | Kod hatalarını gösterir |
| **Docker** | Docker dosyalarını yönetmek için |
| **Python** | Python kodları için |
| **Spring Boot Extension Pack** | Java Spring Boot için |

### Faydalı Eklentiler

| Eklenti | Ne İşe Yarar |
|---------|-------------|
| **GitLens** | Git geçmişini görmek için |
| **Thunder Client** | API test etmek için (Postman gibi) |
| **MongoDB for VS Code** | MongoDB'yi görsel olarak görmek için |
| **Tailwind CSS IntelliSense** | Tailwind class önerileri |
| **Auto Rename Tag** | HTML taglarını otomatik yeniden adlandırır |
| **Path Intellisense** | Dosya yollarını otomatik tamamlar |

### Nasıl Kurulur?

1. VS Code'u açın
2. Sol tarafta **Extensions** ikonuna tıklayın (veya Ctrl+Shift+X)
3. Eklenti adını aratın
4. **Install** butonuna tıklayın

İşte bu kadar!
