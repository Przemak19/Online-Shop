package project.onlineshop.service.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import project.onlineshop.dto.OrderRequest;
import project.onlineshop.dto.Response;
import project.onlineshop.entity.enums.OrderStatus;
import project.onlineshop.mapper.EntityDtoMapper;
import project.onlineshop.repository.ItemRepository;
import project.onlineshop.repository.OrderItemRepository;
import project.onlineshop.repository.OrderRepository;
import project.onlineshop.service.interfaces.OrderItemService;
import project.onlineshop.service.interfaces.UserService;

import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final ItemRepository itemRepository;
    private final UserService userService;
    private final EntityDtoMapper entityDtoMapper;


    @Override
    public Response addOrderItem(OrderRequest orderRequest) {
        return null;
    }

    @Override
    public Response updateOrderItemStatus(Long orderItemId, String status) {
        return null;
    }

    @Override
    public Response filterOrderItems(OrderStatus status, LocalDateTime startDate, LocalDateTime endDate, Long itemId, Pageable pageable) {
        return null;
    }
}
