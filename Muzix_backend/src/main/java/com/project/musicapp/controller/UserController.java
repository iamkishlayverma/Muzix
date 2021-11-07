package com.project.musicapp.controller;

import com.project.musicapp.config.JwtUtil;
import com.project.musicapp.model.AuthRequest;
import com.project.musicapp.model.User;
import com.project.musicapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/")
    public String hello() {
        return "Hello World!";
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        ResponseEntity responseEntity;
        try {
            User user1 = userService.registerUser(user);
            responseEntity = new ResponseEntity(user1, HttpStatus.OK);
        } catch (Exception ex) {
            responseEntity = new ResponseEntity<String>(ex.getMessage() , HttpStatus.CONFLICT);
        }
        return responseEntity;
    }

    @PostMapping("/authenticate")
    public String loginAndGenerateToken(@RequestBody AuthRequest authRequest) throws Exception {
        String username = authRequest.getEmail().split("@")[0];
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, authRequest.getPassword())
            );
        } catch (Exception ex) {
            throw new Exception("Invalid Email and Password combination");
        }
        return jwtUtil.generateToken(username);
    }
}
