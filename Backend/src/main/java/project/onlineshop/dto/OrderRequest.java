package project.onlineshop.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import project.onlineshop.entity.Payment;

import java.math.BigDecimal;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderRequest {

    private BigDecimal price;
    private List<OrderItemRequest> items;
    private Payment payment;
}
