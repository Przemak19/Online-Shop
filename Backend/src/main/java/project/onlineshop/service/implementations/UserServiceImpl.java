package project.onlineshop.service.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.onlineshop.dto.LoginRequest;
import project.onlineshop.dto.Response;
import project.onlineshop.dto.UserDto;
import project.onlineshop.entity.User;
import project.onlineshop.entity.enums.Role;
import project.onlineshop.exception.InvalidCredentialsException;
import project.onlineshop.exception.NotFoundException;
import project.onlineshop.mapper.EntityDtoMapper;
import project.onlineshop.repository.UserRepository;
import project.onlineshop.security.JWTService;
import project.onlineshop.service.interfaces.UserService;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final EntityDtoMapper entityDtoMapper;


    @Override
    public Response registerUser(UserDto registrationRequest) {
        Role role = Role.USER;

        if(registrationRequest.getRole() != null && registrationRequest.getRole().equalsIgnoreCase("ADMIN")) {
            role = Role.ADMIN;
        }

        User user = User.builder()
                .username(registrationRequest.getUsername())
                .email(registrationRequest.getEmail())
                .password(passwordEncoder.encode(registrationRequest.getPassword()))
                .role(role)
                .build();

        User savedUser = userRepository.save(user);
        log.info(savedUser.toString());

        UserDto userDto = entityDtoMapper.mapUserToDtoBasic(savedUser);
        return Response.builder()
                .status(200)
                .message("User successfully registered")
                .user(userDto)
                .build();
    }

    @Override
    public Response loginUser(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new NotFoundException("Email not found"));

        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Password incorrect");
        }

        String token = jwtService.generateToken(user);

        log.info("User logged in successfully");

        return Response.builder()
                .status(200)
                .message("User successfully logged in")
                .token(token)
                .expirationTime("7 days")
                .role(user.getRole().name())
                .build();
    }

    @Override
    public Response getAllUsers() {

        List<User> users = userRepository.findAll();

        List<UserDto> userDtos = users.stream()
                .map(entityDtoMapper::mapUserToDtoBasic)
                .toList();

        log.info("Found {} users", userDtos.size());

        return Response.builder()
                .status(200)
                .userList(userDtos)
                .build();
    }

    @Override
    public User getLoginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        log.info("Logged user is : " + email);

        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public Response getUserWithOrderHistory() {
        User user = getLoginUser();

        UserDto userDto = entityDtoMapper.mapUserToDtoPlusAddressAndOrderHistory(user);

        log.info("Found {} items in order history", userDto.getOrderItemList().size());

        return Response.builder()
                .status(200)
                .user(userDto)
                .build();
    }
}
