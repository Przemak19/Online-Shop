package project.onlineshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.onlineshop.entity.Item;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findAllByCategoryId(Long categoryId);

    @Query("SELECT i FROM Item i WHERE LOWER(i.name) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(i.description) LIKE LOWER(CONCAT('%', :description, '%'))")
    List<Item> findAllByNameContainingOrDescriptionContaining(@Param("name") String name, @Param("description") String description);
}
