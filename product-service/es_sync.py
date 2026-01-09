from models import Product
from search import es, INDEX_NAME
from app import app

with app.app_context():
    products = Product.query.filter_by(is_active=True).all()

    for p in products:
        es.index(
            index=INDEX_NAME,
            id=p.id,
            document={
                "name": p.name,
                "price": float(p.price),
                "category_id": p.category_id
            }
        )

    print(f"✅ {len(products)} products indexed to Elasticsearch")
