package com.project.musicapp.service;


import com.project.musicapp.model.User;

public interface UserService {

    User registerUser(User user) throws Exception;

    User loginUser(User user) throws Exception;
}
