package project.onlineshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.onlineshop.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
