package project.onlineshop.entity;

import jakarta.persistence.*;
import lombok.Data;
import project.onlineshop.entity.enums.PaymentMethod;
import project.onlineshop.entity.enums.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue
    private Long Id;

    private BigDecimal amount;
    private PaymentMethod method;
    private PaymentStatus status;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    private final LocalDateTime created = LocalDateTime.now();
}
