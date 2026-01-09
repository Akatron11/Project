from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
from models import db, Product, Inventory, Category
from search import es, INDEX_NAME   # ✅ Elasticsearch import

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# -----------------------------
# PRODUCTS - LIST / FILTER (SQL)
# -----------------------------
@app.route('/products', methods=['GET'])
def get_products():
    query = (
        Product.query
        .join(Inventory)
        .filter(Product.is_active == True)
    )

    search = request.args.get('q', type=str)
    category_id = request.args.get('category_id', type=int)
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)

    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))

    if category_id:
        query = query.filter(Product.category_id == category_id)

    if min_price is not None:
        query = query.filter(Product.price >= min_price)

    if max_price is not None:
        query = query.filter(Product.price <= max_price)

    products = query.all()

    return jsonify([
        {
            "id": p.id,
            "name": p.name,
            "price": float(p.price),
            "stock": p.inventory.quantity,
            "image_url": p.image_url
        }
        for p in products
    ])


# -----------------------------
# ADD PRODUCT
# -----------------------------
@app.route('/products', methods=['POST'])
def add_product():
    data = request.json

    if not data.get('name') or not data.get('price'):
        return jsonify({"error": "Name and price are required"}), 400

    product = Product(
        name=data['name'],
        price=data['price'],
        category_id=data.get('category_id')
    )
    db.session.add(product)
    db.session.commit()

    inventory = Inventory(
        product_id=product.id,
        quantity=data.get('stock', 0)
    )
    db.session.add(inventory)
    db.session.commit()

    return jsonify({
        "message": "Ürün eklendi",
        "product_id": product.id
    }), 201


# -----------------------------
# ELASTICSEARCH SEARCH
# -----------------------------
@app.route("/products/search", methods=["GET"])
def search_products():
    q = request.args.get("q")

    if not q:
        return jsonify({"error": "Query param q is required"}), 400

    result = es.search(
        index=INDEX_NAME,
        query={
            "match": {
                "name": q
            }
        }
    )

    return jsonify([
        {
            "id": hit["_id"],
            "name": hit["_source"]["name"],
            "price": hit["_source"]["price"],
            "category_id": hit["_source"]["category_id"]
        }
        for hit in result["hits"]["hits"]
    ])


# -----------------------------
# CATEGORIES
# -----------------------------
@app.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([
        {"id": c.id, "name": c.name} for c in categories
    ])


@app.route('/categories', methods=['POST'])
def add_category():
    data = request.json

    if not data.get('name'):
        return jsonify({"error": "Category name is required"}), 400

    existing = Category.query.filter_by(name=data['name']).first()
    if existing:
        return jsonify({"error": "Category already exists"}), 400

    category = Category(name=data['name'])
    db.session.add(category)
    db.session.commit()

    return jsonify({
        "message": "Category created",
        "category_id": category.id
    }), 201


# -----------------------------
# HEALTH CHECK
# -----------------------------
@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "Product service is running"})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
