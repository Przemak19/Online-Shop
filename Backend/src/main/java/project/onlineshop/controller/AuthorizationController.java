package project.onlineshop.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import project.onlineshop.dto.LoginRequest;
import project.onlineshop.dto.Response;
import project.onlineshop.dto.UserDto;
import project.onlineshop.service.interfaces.UserService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/authorization")
public class AuthorizationController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Response> registerUser(@RequestBody UserDto regRequest) {
        return ResponseEntity.ok(userService.registerUser(regRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<Response> loginUser(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(userService.loginUser(loginRequest));
    }
}
