package com.project.musicapp.service.impl;

import com.project.musicapp.model.User;
import com.project.musicapp.repository.UserRepository;
import com.project.musicapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User registerUser(User user) throws Exception {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new Exception("User already exists");
        } else {
            User user1 = userRepository.save(user);
            return user1;
        }
    }

    @Override
    public User loginUser(User user) throws Exception {
        if (!userRepository.existsByEmail(user.getEmail())) {
            throw new Exception("User doesn't exist");
        } else {
            User user1 = userRepository.findByEmail(user.getEmail());
            if (user1.getEmail().equals(user.getEmail())) {
                return user1;
            } else {
                throw new Exception("Incorrect Email and Password");
            }
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (!userRepository.existsByUsername(username)) {
            throw new UsernameNotFoundException("User doesn't exist");
        } else {
            User user = userRepository.findByUsername(username);
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
        }
    }
}
