# Maven ve Java 17 kullanıyoruz (Daha güvenilir imajlar)
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Çalıştırma aşaması (openjdk yerine eclipse-temurin kullanmak daha garantidir)
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]