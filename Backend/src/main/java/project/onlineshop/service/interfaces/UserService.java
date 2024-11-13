package project.onlineshop.service.interfaces;

import project.onlineshop.dto.LoginRequest;
import project.onlineshop.dto.Response;
import project.onlineshop.dto.UserDto;
import project.onlineshop.entity.User;

public interface UserService {

    Response registerUser(UserDto registrationRequest);

    Response loginUser(LoginRequest loginRequest);

    Response getAllUsers();

    User getLoginUser();

    Response getUserWithOrderHistory();
}
