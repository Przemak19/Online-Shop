package project.onlineshop.service.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import project.onlineshop.dto.AddressDto;
import project.onlineshop.dto.Response;
import project.onlineshop.entity.Address;
import project.onlineshop.entity.User;
import project.onlineshop.repository.AddressRepository;
import project.onlineshop.service.interfaces.AddressService;
import project.onlineshop.service.interfaces.UserService;

@Service
@Slf4j
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final UserService userService;

    @Override
    public Response saveAndUpdateAddress(AddressDto addressDto) {
        User user = userService.getLoginUser();

        Address address = user.getAddress();

        if(address == null) {
            address = new Address();
            address.setUser(user);
        }

        if(addressDto.getCountry() != null) address.setCountry(addressDto.getCountry());
        if(addressDto.getCity() != null) address.setCity(addressDto.getCity());
        if(addressDto.getStreet() != null) address.setStreet(addressDto.getStreet());
        if(addressDto.getZipcode() != null) address.setZipcode(addressDto.getZipcode());

        addressRepository.save(address);

        log.info("{} address saved", user.getEmail());

        return Response
                .builder()
                .status(200)
                .message("Address saved successfully")
                .build();
    }
}
