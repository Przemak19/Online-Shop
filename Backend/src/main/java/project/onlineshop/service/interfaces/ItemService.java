package project.onlineshop.service.interfaces;

import org.springframework.web.multipart.MultipartFile;
import project.onlineshop.dto.Response;

public interface ItemService {

    Response createItem(Long categoryId, MultipartFile image, String name, String description, Double price);

    Response updateItem(Long itemId, Long categoryId, MultipartFile image, String name, String description, Double price);

    Response deleteItem(Long itemId);

    Response getItemById(Long ItemId);

    Response getAllItems();

    Response getAllItemsByCategoryId(Long categoryId);

    Response searchItems(String keyword);
}
