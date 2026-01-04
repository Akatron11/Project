import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, ArrowLeft, Eye, Download, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const mockOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 149.99,
    items: [
      {
        id: '1',
        name: 'Wireless Bluetooth Headphones',
        price: 99.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      },
      {
        id: '2',
        name: 'Phone Case',
        price: 24.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=100&h=100&fit=crop',
      },
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    status: 'shipped',
    total: 89.99,
    items: [
      {
        id: '3',
        name: 'Smart Fitness Watch',
        price: 89.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
      },
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    trackingNumber: 'TRK987654321',
  },
  {
    id: 'ORD-003',
    date: '2024-01-08',
    status: 'processing',
    total: 199.99,
    items: [
      {
        id: '4',
        name: 'Laptop Backpack',
        price: 49.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
      },
      {
        id: '5',
        name: 'Wireless Charger',
        price: 29.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop',
      },
      {
        id: '6',
        name: 'Coffee Mug Set',
        price: 34.99,
        quantity: 4,
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=100&h=100&fit=crop',
      },
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered':
      return '✅';
    case 'shipped':
      return '🚚';
    case 'processing':
      return '⏳';
    case 'cancelled':
      return '❌';
    default:
      return '📦';
  }
};

export default function OrdersPage() {
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Please log in to view your orders.</p>
          <Button asChild className="mt-4">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  const filterOrdersByStatus = (status: string) => {
    if (status === 'all') return mockOrders;
    return mockOrders.filter(order => order.status === status);
  };

  const OrderCard = ({ order }: { order: typeof mockOrders[0] }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{order.id}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Placed on {new Date(order.date).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right space-y-2">
            <Badge className={getStatusColor(order.status)}>
              {getStatusIcon(order.status)} {order.status.toUpperCase()}
            </Badge>
            <p className="font-bold">${order.total.toFixed(2)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Order Items */}
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Qty: {item.quantity} × ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          <div className="text-sm text-muted-foreground">
            <p className="font-medium">Shipping to:</p>
            <p>
              {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
          </div>

          {/* Tracking Number */}
          {order.trackingNumber && (
            <div className="text-sm">
              <p className="font-medium">Tracking Number:</p>
              <p className="text-muted-foreground font-mono">{order.trackingNumber}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download Invoice
            </Button>
            {order.status === 'delivered' && (
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reorder
              </Button>
            )}
            {order.trackingNumber && (
              <Button variant="outline" size="sm">
                Track Package
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Order History</h1>
        <p className="text-muted-foreground">
          Track and manage all your orders in one place
        </p>
      </div>

      {/* Order Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            All Orders ({mockOrders.length})
          </TabsTrigger>
          <TabsTrigger value="processing">
            Processing ({filterOrdersByStatus('processing').length})
          </TabsTrigger>
          <TabsTrigger value="shipped">
            Shipped ({filterOrdersByStatus('shipped').length})
          </TabsTrigger>
          <TabsTrigger value="delivered">
            Delivered ({filterOrdersByStatus('delivered').length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({filterOrdersByStatus('cancelled').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="processing" className="mt-6">
          <div className="space-y-4">
            {filterOrdersByStatus('processing').map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shipped" className="mt-6">
          <div className="space-y-4">
            {filterOrdersByStatus('shipped').map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="delivered" className="mt-6">
          <div className="space-y-4">
            {filterOrdersByStatus('delivered').map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6">
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No cancelled orders found.</p>
          </div>
        </TabsContent>
      </Tabs>

      {mockOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">No orders yet</h2>
            <p className="text-muted-foreground">
              When you place your first order, it will appear here.
            </p>
          </div>
          <Button asChild className="mt-6">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}