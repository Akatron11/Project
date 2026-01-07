This project simulates the Event-Driven Microservice structure used in modern software architectures. Java and Python services communicate asynchronously via the RabbitMQ message queue.
----------------------------------------------------------------------------------------------------------------------------------------------

Architectural Components

Order Service (Java/Spring Boot): Receives order requests from the user, saves order data to a MySQL database, and sends an "Order Created" message to RabbitMQ.

Product Service (Python): Continuously listens to RabbitMQ. When a new order message arrives, it updates the stock quantity in the PostgreSQL database.

Message Broker (RabbitMQ): Provides independent communication between the two services.

Containerization: The entire infrastructure (Databases and RabbitMQ) is managed with Docker Compose.
----------------------------------------------------------------------------------------------------------------------------------------------

Technologies Used
Backend: Java 17, Spring Boot 3.5.x, Python 3.x

Database: MySQL 8.0, PostgreSQL 15

Messaging: RabbitMQ (AMQP)

Libraries: Spring Data JPA, Pika, Psycopg2, Lombok
----------------------------------------------------------------------------------------------------------------------------------------------

Starting the System


Start the Infrastructure:
docker-compose up -d


Order Service (Java):
cd order-service
mvn spring-boot:run


Product Service (Python):
cd product-service
python consumer.py


Testing (PowerShell / Terminal)
To test the system, an order can be sent with the following command:

PowerShell
Invoke-RestMethod -Method Post -Uri "http://localhost:8080/api/orders" -ContentType "application/json" -Body '{"productId": 10, "quantity": 5, "customerName": "Cousin Zafer"}'
----------------------------------------------------------------------------------------------------------------------------------------------
