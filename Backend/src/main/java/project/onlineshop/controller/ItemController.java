package project.onlineshop.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project.onlineshop.dto.Response;
import project.onlineshop.exception.InvalidCredentialsException;
import project.onlineshop.service.interfaces.ItemService;

import java.math.BigDecimal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/item")
public class ItemController {

    private final ItemService itemService;

    @PostMapping("/create")
    public ResponseEntity<Response> createItem(@RequestParam Long categoryId,
                                               @RequestParam MultipartFile image,
                                               @RequestParam String name,
                                               @RequestParam String description,
                                               @RequestParam BigDecimal price
    ) {

      if(categoryId == null || image.isEmpty() || name.isEmpty() || description.isEmpty() || price == null || price.compareTo(BigDecimal.ZERO) < 0) {
        throw new InvalidCredentialsException("All fields are required");
      }

      return ResponseEntity.ok(itemService.createItem(categoryId, image, name, description, price));
    }

    @PutMapping("/update/{itemId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> createItem(@PathVariable Long itemId,
                                               @RequestParam(required = false) Long categoryId,
                                               @RequestParam(required = false) MultipartFile image,
                                               @RequestParam(required = false) String name,
                                               @RequestParam(required = false) String description,
                                               @RequestParam(required = false) BigDecimal price
    ) {

        return ResponseEntity.ok(itemService.updateItem(itemId, categoryId, image, name, description, price));
    }

    @DeleteMapping("/delete/{itemId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteItem(@PathVariable Long itemId) {

        return ResponseEntity.ok(itemService.deleteItem(itemId));
    }

    @GetMapping("/get-by-category/{categoryId}")
    public ResponseEntity<Response> getItems(@PathVariable Long categoryId) {

        return ResponseEntity.ok(itemService.getAllItemsByCategoryId(categoryId));
    }

    @GetMapping("/get-all-items")
    public ResponseEntity<Response> getAllItems() {

        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/get-item/{itemId}")
    public ResponseEntity<Response> getItem(@PathVariable Long itemId) {

        return ResponseEntity.ok(itemService.getItemById(itemId));
    }

    @GetMapping("/search")
    public ResponseEntity<Response> searchItem(@RequestParam String keyword) {

        return ResponseEntity.ok(itemService.searchItems(keyword));
    }

}
