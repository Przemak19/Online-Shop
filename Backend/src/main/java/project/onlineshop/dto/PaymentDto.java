package project.onlineshop.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PaymentDto {

    private Long Id;

    private BigDecimal amount;
    private String method;
    private String status;

    private OrderDto order;

    private final LocalDateTime created = LocalDateTime.now();
}
