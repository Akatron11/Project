import json
import pika
from models import db, Inventory
from app import app

def update_stock(product_id, quantity):
    with app.app_context():
        inventory = Inventory.query.filter_by(product_id=product_id).first()
        if inventory and inventory.quantity >= quantity:
            inventory.quantity -= quantity
            db.session.commit()
            print(f"Stok güncellendi: {product_id} -{quantity}")

def callback(ch, method, properties, body):
    data = json.loads(body)
    update_stock(data['productId'], data['quantity'])

def start_consumer():
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host='rabbitmq')
    )
    channel = connection.channel()
    channel.queue_declare(queue='order_queue', durable=True)
    channel.basic_consume(
        queue='order_queue',
        on_message_callback=callback,
        auto_ack=True
    )
    print("Siparişler bekleniyor...")
    channel.start_consuming()

if __name__ == "__main__":
    start_consumer()
