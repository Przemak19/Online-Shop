package project.onlineshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.onlineshop.entity.Item;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findAllByCategoryId(Long categoryId);

    List<Item> findAllByNameContainingOrDescriptionContaining(String name, String description);
}
