# Node.js tabanlı imajı kullan
FROM node:18

# Konteyner içinde çalışma klasörü oluştur
WORKDIR /app

# Bağımlılık dosyalarını kopyala
COPY package*.json ./

# Kütüphaneleri kur
RUN npm install

# Projenin kalan kodlarını kopyala
COPY . .

# Gateway portunu dış dünyaya aç
EXPOSE 9000

# Uygulamayı başlat
CMD ["node", "index.js"]