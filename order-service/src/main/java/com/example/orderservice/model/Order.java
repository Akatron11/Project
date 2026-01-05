package com.example.orderservice.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String userId;
    private String productId;
    private Integer quantity;
    private Double totalPrice;
    private String status; // "CREATED", "SHIPPED", "CANCELLED"
}