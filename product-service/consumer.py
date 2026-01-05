import pika
import json
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

def update_stock(product_id, quantity):
    try:
        # PostgreSQL Bağlantısı
        conn = psycopg2.connect(
            dbname=os.getenv("DB_NAME", "products_db"),
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASSWORD", "password"),
            host=os.getenv("DB_HOST", "localhost")
        )
        cur = conn.cursor()
        
        # Stoğu düşür
        cur.execute(
            "UPDATE products SET stock = stock - %s WHERE id = %s AND stock >= %s",
            (quantity, product_id, quantity)
        )
        
        conn.commit()
        print(f" [x] Stok güncellendi: Ürün {product_id}, Miktar -{quantity}")
        cur.close()
        conn.close()
    except Exception as e:
        print(f" [!] Veritabanı hatası: {e}")

def callback(ch, method, properties, body):
    print(f" [x] Mesaj alındı: {body}")
    data = json.loads(body)
    update_stock(data['productId'], data['quantity'])

# RabbitMQ Bağlantısı
def start_consumer():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='order_queue', durable=True)

    channel.basic_consume(queue='order_queue', on_message_callback=callback, auto_ack=True)

    print(' [*] Siparişler bekleniyor. Çıkmak için CTRL+C')
    channel.start_consuming()

if __name__ == "__main__":
    start_consumer()