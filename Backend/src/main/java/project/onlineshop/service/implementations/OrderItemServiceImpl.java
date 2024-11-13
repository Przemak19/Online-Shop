package project.onlineshop.service.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.onlineshop.dto.OrderItemDto;
import project.onlineshop.dto.OrderRequest;
import project.onlineshop.dto.Response;
import project.onlineshop.entity.Item;
import project.onlineshop.entity.Order;
import project.onlineshop.entity.OrderItem;
import project.onlineshop.entity.User;
import project.onlineshop.entity.enums.OrderStatus;
import project.onlineshop.exception.NotFoundException;
import project.onlineshop.mapper.EntityDtoMapper;
import project.onlineshop.repository.ItemRepository;
import project.onlineshop.repository.OrderItemRepository;
import project.onlineshop.repository.OrderRepository;
import project.onlineshop.repository.specifications.OrderItemSpecification;
import project.onlineshop.service.interfaces.OrderItemService;
import project.onlineshop.service.interfaces.UserService;

import java.time.LocalDateTime;
import java.util.List;

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
    public Response addOrderItems(OrderRequest orderRequest) {
        User user = userService.getLoginUser();

        List<OrderItem> orderItems = orderRequest.getItems().stream().map(orderItemRequest -> {
            Item item = itemRepository.findById(orderItemRequest.getItemId()).orElseThrow(() -> new NotFoundException("Item not found"));

            OrderItem orderItem = new OrderItem();

            orderItem.setItem(item);
            orderItem.setUser(user);
            orderItem.setPrice(orderItem.getPrice() * orderItemRequest.getQuantity());
            orderItem.setStatus(OrderStatus.PENDING);
            orderItem.setQuantity(orderItemRequest.getQuantity());

            return orderItem;
        }).toList();

        Double totalPrice = (orderRequest.getPrice() != null && orderRequest.getPrice() > 0)
                ? orderRequest.getPrice()
                : orderItems.stream().mapToDouble(OrderItem::getPrice).sum();

        Order order = new Order();

        order.setOrderItemList(orderItems);
        order.setPrice(totalPrice);

        orderItems.forEach(orderItem -> orderItem.setOrder(order));

        orderRepository.save(order);
        log.info("Order added successfully");

        return Response.builder()
                .status(200)
                .message("Order saved")
                .build();

    }

    @Override
    public Response updateOrderItemStatus(Long orderItemId, String status) {
        OrderItem orderItem = orderItemRepository.findById(orderItemId).orElseThrow(() -> new NotFoundException("Order item not found"));

        orderItem.setStatus(OrderStatus.valueOf(status.toUpperCase()));

        orderItemRepository.save(orderItem);
        log.info("Order item with id {} updated successfully", orderItemId);

        return Response.builder()
                .status(200)
                .message("Order updated")
                .build();
    }

    @Override
    public Response filterOrderItems(OrderStatus status, LocalDateTime startDate, LocalDateTime endDate, Long itemId, Pageable pageable) {
        Specification<OrderItem> specification = Specification.where(OrderItemSpecification.hasStatus(status))
                .and(OrderItemSpecification.createdBetween(startDate, endDate))
                .and(OrderItemSpecification.hasItemId(itemId));

        Page<OrderItem> orderItemsPage = orderItemRepository.findAll(specification, pageable);

        if(orderItemsPage.isEmpty()) {
            throw new NotFoundException("Order item not found");
        }

        List<OrderItemDto> orderItemDtoList = orderItemsPage.getContent().stream()
                .map(entityDtoMapper::mapOrderItemToDtoPlusProductAndUser)
                .toList();

        log.info("Found {} order items", orderItemDtoList.size());

        return Response.builder()
                .status(200)
                .orderItemList(orderItemDtoList)
                .totalPage(orderItemsPage.getTotalPages())
                .totalElement(orderItemsPage.getTotalElements())
                .build();
    }
}
