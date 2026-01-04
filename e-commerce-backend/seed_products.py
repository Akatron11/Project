import requests

API_URL = "http://localhost:8000/products"

products = [
    {
        "name": "Gaming Laptop",
        "description": "High performance gaming laptop",
        "price": 25000,
        "category": "Electronics",
        "stock": 10
    },
    {
        "name": "Smartphone",
        "description": "Latest generation smartphone",
        "price": 15000,
        "category": "Electronics",
        "stock": 20
    },
    {
        "name": "Wireless Headphones",
        "description": "Noise cancelling headphones",
        "price": 3500,
        "category": "Electronics",
        "stock": 30
    },
    {
        "name": "Running Shoes",
        "description": "Comfortable running shoes",
        "price": 2200,
        "category": "Fashion",
        "stock": 40
    },
    {
        "name": "T-Shirt",
        "description": "Cotton t-shirt",
        "price": 500,
        "category": "Fashion",
        "stock": 100
    },
    {
        "name": "Backpack",
        "description": "Durable travel backpack",
        "price": 1800,
        "category": "Accessories",
        "stock": 25
    },
    {
        "name": "Coffee Maker",
        "description": "Automatic coffee machine",
        "price": 4200,
        "category": "Home",
        "stock": 15
    },
    {
        "name": "Book: Clean Code",
        "description": "Software craftsmanship book",
        "price": 650,
        "category": "Books",
        "stock": 50
    }
]

for product in products:
    response = requests.post(API_URL, json=product)
    if response.status_code == 200:
        print(f"✅ Added: {product['name']}")
    else:
        print(f"❌ Failed: {product['name']} -> {response.text}")
