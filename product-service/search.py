from elasticsearch import Elasticsearch
import os

# Docker Compose'daki servis ismin neyse onu yazmalısın. 
# Genelde 'elasticsearch' olur. .env'den çekmesi en sağlıklısı.
ELASTIC_URL = os.getenv("ELASTICSEARCH_URL", "http://elasticsearch:9200")
INDEX_NAME = "products"

# retry_on_timeout ekledik ki Elasticsearch hemen uyanmazsa servis patlamasın
es = Elasticsearch(
    [ELASTIC_URL],
    retry_on_timeout=True,
    max_retries=3
)