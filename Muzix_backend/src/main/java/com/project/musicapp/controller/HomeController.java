package com.project.musicapp.controller;

import com.project.musicapp.config.JwtUtil;
import com.project.musicapp.model.AuthRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
public class HomeController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/")
    public String hello() {
        return "Hello World!";
    }

    @PostMapping("/authenticate")
    public String generateToken(@RequestBody AuthRequest authRequest) throws Exception {
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

