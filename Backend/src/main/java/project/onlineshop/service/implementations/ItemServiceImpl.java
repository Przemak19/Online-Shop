package project.onlineshop.service.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import project.onlineshop.dto.ItemDto;
import project.onlineshop.dto.Response;
import project.onlineshop.entity.Category;
import project.onlineshop.entity.Item;
import project.onlineshop.exception.NotFoundException;
import project.onlineshop.mapper.EntityDtoMapper;
import project.onlineshop.repository.CategoryRepository;
import project.onlineshop.repository.ItemRepository;
import project.onlineshop.service.AwsS3Service;
import project.onlineshop.service.interfaces.ItemService;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;
    private final EntityDtoMapper entityDtoMapper;
    private final AwsS3Service awsS3Service;


    @Override
    public Response createItem(Long categoryId, MultipartFile image, String name, String description, Double price) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new NotFoundException("Category not found"));

        String imageUrl = awsS3Service.saveImageToS3Bucket(image);

        Item item = new Item();
        item.setCategory(category);
        item.setName(name);
        item.setDescription(description);
        item.setPrice(price);
        item.setImageUrl(imageUrl);

        itemRepository.save(item);
        log.info("Item {} saved", name);

        return Response.builder()
                .status(200)
                .message("Item saved")
                .build();
    }

    @Override
    public Response updateItem(Long itemId, Long categoryId, MultipartFile image, String name, String description, Double price) {
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new NotFoundException("Item not found"));

        Category category = null;
        String imageUrl = null;

        if(categoryId != null) {
            category = categoryRepository.findById(categoryId).orElseThrow(() -> new NotFoundException("Category not found"));
        }
        if(image != null && !image.isEmpty()) {
            imageUrl = awsS3Service.saveImageToS3Bucket(image);
        }

        if(category != null) item.setCategory(category);
        if(name != null) item.setName(name);
        if(description != null) item.setDescription(description);
        if(price != null) item.setPrice(price);
        if(imageUrl != null) item.setImageUrl(imageUrl);

        itemRepository.save(item);
        log.info("Item {} updated", name);

        return Response.builder()
                .status(200)
                .message("Item updated")
                .build();
    }

    @Override
    public Response deleteItem(Long itemId) {
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new NotFoundException("Item not found"));

        itemRepository.delete(item);
        log.info("Item with id {} deleted", itemId);

        return Response.builder()
                .status(200)
                .message("Item deleted")
                .build();
    }

    @Override
    public Response getItemById(Long itemId) {
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new NotFoundException("Item not found"));

        ItemDto itemDto = entityDtoMapper.mapItemToDtoBasic(item);
        log.info("Item with id {} found", itemId);

        return Response.builder()
                .status(200)
                .item(itemDto)
                .build();
    }

    @Override
    public Response getAllItems() {
        List<ItemDto> itemList = itemRepository.findAll(Sort.by(Sort.Direction.ASC, "id")).stream()
                .map(entityDtoMapper::mapItemToDtoBasic)
                .toList();

        log.info("Found {} items", itemList.size());

        return Response.builder()
                .status(200)
                .itemList(itemList)
                .build();
    }

    @Override
    public Response getAllItemsByCategoryId(Long categoryId) {
        List<Item> itemList = itemRepository.findAllByCategoryId(categoryId);

        if(itemList.isEmpty()) {
            throw new NotFoundException("No items found for this category");
        }

        List<ItemDto> itemDtoList = itemList.stream()
                        .map(entityDtoMapper::mapItemToDtoBasic)
                                .toList();

        log.info("Found {} items by category", itemList.size());

        return Response.builder()
                .status(200)
                .itemList(itemDtoList)
                .build();
    }

    @Override
    public Response searchItems(String keyword) {
        List<Item> itemList = itemRepository.findAllByNameContainingOrDescriptionContaining(keyword, keyword);

        if(itemList.isEmpty()) {
            throw new NotFoundException("No items found for this keyword");
        }

        List<ItemDto> itemDtoList = itemList.stream()
                .map(entityDtoMapper::mapItemToDtoBasic)
                .toList();

        log.info("Found {} items by keyword {}", itemList.size(), keyword);

        return Response.builder()
                .status(200)
                .itemList(itemDtoList)
                .build();
    }
}
