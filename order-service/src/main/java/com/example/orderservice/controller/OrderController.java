package com.example.orderservice.controller;

import com.example.orderservice.model.Order;
import com.example.orderservice.repository.OrderRepository;
import com.example.orderservice.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        order.setStatus("CREATED");
        Order savedOrder = orderRepository.save(order);

        // MESSAGING: Python servisine mesaj gönderiyoruz
        String message = "{\"productId\": \"" + order.getProductId() + "\", \"quantity\": " + order.getQuantity() + "}";
        rabbitTemplate.convertAndSend(RabbitMQConfig.QUEUE, message);
        
        return savedOrder;
    }
}