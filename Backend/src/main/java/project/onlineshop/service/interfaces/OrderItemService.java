package project.onlineshop.service.interfaces;

import org.springframework.data.domain.Pageable;
import project.onlineshop.dto.OrderRequest;
import project.onlineshop.dto.Response;
import project.onlineshop.entity.enums.OrderStatus;

import java.time.LocalDateTime;

public interface OrderItemService {

    Response addOrderItems(OrderRequest orderRequest);

    Response updateOrderItemStatus(Long orderItemId, String status);

    Response filterOrderItems(OrderStatus status, LocalDateTime startDate, LocalDateTime endDate, Long itemId, Pageable pageable);
}
