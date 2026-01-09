# 1. Node.js imajını kullan
FROM node:18

# 2. Çalışma dizinini oluştur
WORKDIR /app

# 3. Bağımlılıkları kopyala ve yükle
COPY package*.json ./
RUN npm install

# 4. Tüm kodları kopyala
COPY . .

# 5. Servisi 3000 portundan çalıştır
EXPOSE 3000

# 6. Başlatma komutu
CMD ["node", "server.js"]