package project.onlineshop.mapper;

import project.onlineshop.dto.*;
import project.onlineshop.entity.*;

import java.util.stream.Collectors;

public class EntityDtoMapper {

    public UserDto mapUserToDtoBasic(User user){
        UserDto userDto = new UserDto();

        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole().name());
        userDto.setUsername(user.getUsername());

        return userDto;
    }

    public AddressDto mapAddressToDtoBasic(Address address){
        AddressDto addressDto = new AddressDto();

        addressDto.setId(address.getId());
        addressDto.setCountry(address.getCountry());
        addressDto.setZipcode(address.getZipcode());
        addressDto.setCity(address.getCity());
        addressDto.setStreet(address.getStreet());

        return addressDto;
    }

    public CategoryDto mapCategoryToDtoBasic(Category category){
        CategoryDto categoryDto = new CategoryDto();

        categoryDto.setId(category.getId());
        categoryDto.setName(category.getName());

        return categoryDto;
    }

    public OrderItemDto mapOrderItemToDtoBasic(OrderItem orderItem){
        OrderItemDto orderItemDto = new OrderItemDto();

        orderItemDto.setId(orderItem.getId());
        orderItemDto.setQuantity(orderItem.getQuantity());
        orderItemDto.setPrice(orderItem.getPrice());
        orderItemDto.setStatus(orderItem.getStatus().name());
        orderItemDto.setCreated(orderItem.getCreated());

        return orderItemDto;
    }

    public ItemDto mapProductToDtoBasic(Item item){
        ItemDto itemDto = new ItemDto();

        itemDto.setId(item.getId());
        itemDto.setName(item.getName());
        itemDto.setDescription(item.getDescription());
        itemDto.setImageUrl(item.getImageUrl());
        itemDto.setPrice(item.getPrice());

        return itemDto;
    }

    public UserDto mapUserToDtoPlusAddress(User user){
        UserDto userDto = mapUserToDtoBasic(user);

        if (user.getAddress() != null){
            AddressDto addressDto = mapAddressToDtoBasic(user.getAddress());
            userDto.setAddress(addressDto);
        }

        return userDto;
    }

    public OrderItemDto mapOrderItemToDtoPlusProduct(OrderItem orderItem){
        OrderItemDto orderItemDto = mapOrderItemToDtoBasic(orderItem);

        if (orderItem.getItem() != null) {
            ItemDto productDto = mapProductToDtoBasic(orderItem.getItem());
            orderItemDto.setItem(productDto);
        }

        return orderItemDto;
    }

    public OrderItemDto mapOrderItemToDtoPlusProductAndUser(OrderItem orderItem){
        OrderItemDto orderItemDto = mapOrderItemToDtoPlusProduct(orderItem);

        if (orderItem.getUser() != null){
            UserDto userDto = mapUserToDtoPlusAddress(orderItem.getUser());
            orderItemDto.setUser(userDto);
        }

        return orderItemDto;
    }

    public UserDto mapUserToDtoPlusAddressAndOrderHistory(User user) {
        UserDto userDto = mapUserToDtoPlusAddress(user);

        if (user.getOrderItemList() != null && !user.getOrderItemList().isEmpty()) {
            userDto.setOrderItemList(user.getOrderItemList()
                    .stream()
                    .map(this::mapOrderItemToDtoPlusProduct)
                    .collect(Collectors.toList()));
        }

        return userDto;
    }
}
