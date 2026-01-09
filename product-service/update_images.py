from app import app
from models import db, Product

# Ürünlere uygun görseller (Unsplash'tan)
product_images = {
    "Laptop": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    "Gaming Laptop": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
    "Mouse": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    "Wireless Mouse": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400",
    "Keyboard": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    "Mechanical Keyboard": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400",
    "Monitor 24 inch": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
    "Monitor 27 inch": "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400",
    "Headphones": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    "Bluetooth Headphones": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400",
    "Webcam": "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400",
    "USB Flash Drive 64GB": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400",
    "USB Flash Drive 128GB": "https://images.unsplash.com/photo-1618410320928-25228d811631?w=400",
    "External Hard Drive 1TB": "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400",
    "External SSD 1TB": "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400",
    "Bluetooth Speaker": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    "Power Bank 20000mAh": "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400",
    "Smartphone Stand": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
    "HDMI Cable": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    "USB-C Hub": "https://images.unsplash.com/photo-1625723044792-44de16ccb4e8?w=400",
}

with app.app_context():
    updated_count = 0
    for product_name, image_url in product_images.items():
        product = Product.query.filter_by(name=product_name).first()
        if product:
            product.image_url = image_url
            updated_count += 1
            print(f"✅ Updated: {product_name}")
        else:
            print(f"❌ Not found: {product_name}")
    
    db.session.commit()
    print(f"\n🎉 {updated_count} ürüne görsel eklendi!")
