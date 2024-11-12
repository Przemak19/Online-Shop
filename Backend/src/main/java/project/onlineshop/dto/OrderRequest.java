package project.onlineshop.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import project.onlineshop.entity.Payment;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderRequest {

    private Double price;
    private List<OrderItemRequest> items;
    private Payment payment;
}
