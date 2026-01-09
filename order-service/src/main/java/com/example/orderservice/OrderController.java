package com.example.orderservice;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    // GET - Tüm siparişleri listele
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // GET - Belirli bir siparişi getir
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET - Kullanıcının siparişlerini getir
    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable String userId) {
        return orderRepository.findByUserId(userId);
    }

    // POST - Yeni sipariş oluştur
    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        order.setStatus("CREATED");
        Order savedOrder = orderRepository.save(order);

        // MESSAGING: Python servisine mesaj gönderiyoruz (stok güncelleme)
        String message = "{\"productId\": \"" + order.getProductId() + "\", \"quantity\": " + order.getQuantity() + "}";
        rabbitTemplate.convertAndSend(RabbitMQConfig.QUEUE, message);

        return savedOrder;
    }

    // PUT - Sipariş durumunu güncelle
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order orderDetails) {
        return orderRepository.findById(id)
                .map(order -> {
                    if (orderDetails.getStatus() != null) {
                        order.setStatus(orderDetails.getStatus());
                    }
                    if (orderDetails.getQuantity() != null) {
                        order.setQuantity(orderDetails.getQuantity());
                    }
                    if (orderDetails.getTotalPrice() != null) {
                        order.setTotalPrice(orderDetails.getTotalPrice());
                    }
                    return ResponseEntity.ok(orderRepository.save(order));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE - Siparişi iptal et
    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelOrder(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setStatus("CANCELLED");
                    orderRepository.save(order);
                    return ResponseEntity.ok(java.util.Map.of("message", "Sipariş iptal edildi"));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}