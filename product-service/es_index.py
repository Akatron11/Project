from search import es, INDEX_NAME

mapping = {
    "mappings": {
        "properties": {
            "name": {"type": "text"},
            "price": {"type": "float"},
            "category_id": {"type": "integer"}
        }
    }
}

if not es.indices.exists(index=INDEX_NAME):
    es.indices.create(index=INDEX_NAME, body=mapping)
    print("✅ Elasticsearch index created")
else:
    print("ℹ️ Index already exists")
