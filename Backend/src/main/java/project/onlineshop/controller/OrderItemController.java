package project.onlineshop.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import project.onlineshop.dto.OrderRequest;
import project.onlineshop.dto.Response;
import project.onlineshop.entity.enums.OrderStatus;
import project.onlineshop.service.interfaces.OrderItemService;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderItemController {

    private final OrderItemService orderItemService;

    @PostMapping("/create")
    public ResponseEntity<Response> addOrder(@RequestParam OrderRequest orderRequest) {

        return ResponseEntity.ok(orderItemService.addOrderItems(orderRequest));
    }

    @PutMapping("/update-status/{orderItemId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateOrderItemStatus(@PathVariable Long orderItemId, @RequestParam String status) {

        return ResponseEntity.ok(orderItemService.updateOrderItemStatus(orderItemId, status));
    }

    @GetMapping("/filter")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> filter(@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)LocalDateTime startDate,
                                           @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)LocalDateTime endDate,
                                           @RequestParam(required = false) String status,
                                           @RequestParam(required = false) Long itemId,
                                           @RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "1000") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));

        OrderStatus orderStatus = status != null ? OrderStatus.valueOf(status) : null;

        return ResponseEntity.ok(orderItemService.filterOrderItems(orderStatus,startDate,endDate,itemId,pageable));
    }
}
