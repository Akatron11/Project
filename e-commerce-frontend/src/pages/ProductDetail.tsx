import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { getProductById } from '@/services/productService';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    if (id) {
      getProductById(Number(id))
        .then(setProduct)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading product...</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-muted-foreground mb-6">{product.description}</p>

      <p className="text-2xl font-bold mb-6">${product.price}</p>

      <Button onClick={() => addItem(product)}>
        Add to Cart
      </Button>
    </div>
  );
}
