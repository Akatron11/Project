from app import app
from models import db, Product, Inventory, Category

with app.app_context():
    # Kategori ekle (yoksa)
    electronics = Category.query.filter_by(name="Electronics").first()
    if not electronics:
        electronics = Category(name="Electronics")
        db.session.add(electronics)
        db.session.commit()

    products = [
        {"name": "Laptop", "price": 35000, "stock": 10},
        {"name": "Gaming Laptop", "price": 52000, "stock": 5},
        {"name": "Mouse", "price": 500, "stock": 50},
        {"name": "Wireless Mouse", "price": 900, "stock": 40},
        {"name": "Keyboard", "price": 1200, "stock": 30},
        {"name": "Mechanical Keyboard", "price": 3200, "stock": 15},
        {"name": "Monitor 24 inch", "price": 7000, "stock": 15},
        {"name": "Monitor 27 inch", "price": 11000, "stock": 10},
        {"name": "Headphones", "price": 2500, "stock": 25},
        {"name": "Bluetooth Headphones", "price": 4200, "stock": 18},
        {"name": "Webcam", "price": 1800, "stock": 20},
        {"name": "USB Flash Drive 64GB", "price": 400, "stock": 100},
        {"name": "USB Flash Drive 128GB", "price": 750, "stock": 80},
        {"name": "External Hard Drive 1TB", "price": 3200, "stock": 12},
        {"name": "External SSD 1TB", "price": 6500, "stock": 8},
        {"name": "Bluetooth Speaker", "price": 2200, "stock": 18},
        {"name": "Power Bank 20000mAh", "price": 1500, "stock": 22},
        {"name": "Smartphone Stand", "price": 300, "stock": 60},
        {"name": "HDMI Cable", "price": 250, "stock": 70},
        {"name": "USB-C Hub", "price": 1900, "stock": 16},
    ]

    for p in products:
        existing = Product.query.filter_by(name=p["name"]).first()
        if not existing:
            product = Product(
                name=p["name"],
                price=p["price"],
                category_id=electronics.id
            )
            db.session.add(product)
            db.session.commit()

            inventory = Inventory(
                product_id=product.id,
                quantity=p["stock"]
            )
            db.session.add(inventory)
            db.session.commit()

    print("✅ Seed data eklendi (20 ürün).")
