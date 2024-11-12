package project.onlineshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.onlineshop.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
