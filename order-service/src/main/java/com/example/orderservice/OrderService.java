package com.example.orderservice;

import org.springframework.stereotype.Service;

@Service
public class OrderService {
    // İçerisi şu anlık placeholder olarak kalabilir, 
    // asıl işi Controller'da RabbitMQ ile yapıyoruz zaten.
    public void createOrder() {}
    public void getUserOrders() {}
    public void getOrderById() {}
    public void updateOrderStatus() {}
    public void cancelOrder() {}
}