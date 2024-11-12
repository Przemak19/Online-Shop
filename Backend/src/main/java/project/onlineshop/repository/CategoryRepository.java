package project.onlineshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.onlineshop.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
