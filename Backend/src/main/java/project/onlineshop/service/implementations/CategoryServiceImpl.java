package project.onlineshop.service.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import project.onlineshop.dto.CategoryDto;
import project.onlineshop.dto.Response;
import project.onlineshop.entity.Category;
import project.onlineshop.exception.NotFoundException;
import project.onlineshop.mapper.EntityDtoMapper;
import project.onlineshop.repository.CategoryRepository;
import project.onlineshop.service.interfaces.CategoryService;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final EntityDtoMapper entityDtoMapper;


    @Override
    public Response createCategory(CategoryDto categoryDto) {
        Category category = new Category();

        category.setName(categoryDto.getName());

        categoryRepository.save(category);
        log.info("Category successfully saved");

        return Response.builder()
                .status(200)
                .message("Category successfully saved")
                .build();
    }

    @Override
    public Response updateCategory(Long categoryId, CategoryDto categoryDto) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new NotFoundException("Category Not Found"));

        category.setName(categoryDto.getName());

        categoryRepository.save(category);
        log.info("Category successfully updated");

        return Response.builder()
                .status(200)
                .message("Category successfully updated")
                .build();
    }

    @Override
    public Response deleteCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new NotFoundException("Category Not Found"));

        categoryRepository.delete(category);
        log.info("Category successfully deleted");

        return Response.builder()
                .status(200)
                .message("Category successfully deleted")
                .build();
    }

    @Override
    public Response getAllCategories() {
        List<Category> categories = categoryRepository.findAll();

        List<CategoryDto> categoryDtoList = categories.stream()
                .map(entityDtoMapper::mapCategoryToDtoBasic)
                .toList();

        log.info("Found {} categories", categories.size());

        return Response.builder()
                .status(200)
                .categoryList(categoryDtoList)
                .build();
    }

    @Override
    public Response getCategoryById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new NotFoundException("Category Not Found"));

        CategoryDto categoryDto = entityDtoMapper.mapCategoryToDtoBasic(category);

        log.info("Category with id {} successfully found", categoryId);

        return Response.builder()
                .status(200)
                .category(categoryDto)
                .build();
    }
}
