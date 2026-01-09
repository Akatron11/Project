import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '@/services/productService';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [showOnSale, setShowOnSale] = useState(false); // backend’de karşılığı yok ama UI kalsın

  const { addItem } = useCart();

  /* 🔹 Backend’den ürünleri çek */
  useEffect(() => {
    setLoading(true);

    getProducts({
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
      search: searchTerm || undefined,
    })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Product fetch error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedCategory, searchTerm]);

  /* 🔹 Frontend filtreleri (backend modeline uygun) */
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Price filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(
        (p) => p.price >= min && (max ? p.price <= max : true)
      );
    }

    // On sale → backend’de alan yok, o yüzden etkisiz
    // if (showOnSale) {
    //   filtered = filtered;
    // }

    return filtered;
  }, [products, priceRange, showOnSale]);

  /* 🔹 Loading */
  if (loading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-muted-foreground">
          Discover our complete collection of quality products
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 space-y-6">
              <h3 className="font-semibold flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </h3>

              {/* Search */}
              <div className="space-y-2">
                <Label>Search Products</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Separator />

              {/* Category */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {PRODUCT_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Price */}
              <div className="space-y-2">
                <Label>Price Range</Label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-1000">0 - 1.000</SelectItem>
                    <SelectItem value="1000-5000">1.000 - 5.000</SelectItem>
                    <SelectItem value="5000-10000">5.000 - 10.000</SelectItem>
                    <SelectItem value="10000">10.000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* On Sale */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="onSale"
                  checked={showOnSale}
                  onCheckedChange={(checked) => setShowOnSale(checked === true)}
                />
                <Label htmlFor="onSale">On Sale Only</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          <p className="text-muted-foreground mb-4">
            Showing {filteredProducts.length} products
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4 space-y-3">
                  <img
                    src={product.image_url || product.image || "https://picsum.photos/400/250"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md bg-gray-100"
                  />

                  <h3 className="font-medium">
                    <Link to={`/products/${product.id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold">{product.price} ₺</p>
                  <Button size="sm" onClick={() => addItem(product)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
