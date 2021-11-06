package com.project.musicapp.controller;

import com.project.musicapp.model.User;
import com.project.musicapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

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

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        ResponseEntity responseEntity;
        try {
            User user1 = userService.loginUser(user);
            responseEntity = new ResponseEntity(user1, HttpStatus.OK);
        } catch (Exception ex) {
            responseEntity = new ResponseEntity<String>(ex.getMessage() , HttpStatus.CONFLICT);
        }
        return responseEntity;
    }
}
