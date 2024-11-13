package project.onlineshop.service.interfaces;

import project.onlineshop.dto.CategoryDto;
import project.onlineshop.dto.Response;
import project.onlineshop.entity.Category;

public interface CategoryService {

    Response createCategory(CategoryDto categoryDto);

    Response updateCategory(Long categoryId, CategoryDto categoryDto);

    Response deleteCategory(Long categoryId);

    Response getAllCategories();

    Response getCategoryById(Long categoryId);
}
