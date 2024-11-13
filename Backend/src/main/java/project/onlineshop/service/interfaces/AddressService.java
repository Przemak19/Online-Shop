package project.onlineshop.service.interfaces;

import project.onlineshop.dto.AddressDto;
import project.onlineshop.dto.Response;

public interface AddressService {

    Response saveAndUpdateAddress(AddressDto addressDto);
}
