package project.onlineshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.onlineshop.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
