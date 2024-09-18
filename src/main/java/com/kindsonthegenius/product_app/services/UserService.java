package com.kindsonthegenius.product_app.services;

import com.kindsonthegenius.product_app.model.User;
import com.kindsonthegenius.product_app.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService( UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(Integer id){
        return userRepository.findById(id).orElse(null);
    }

    public User addUser(User user){
        return userRepository.save(user);
    }

    public  User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Integer id){
        userRepository.deleteById(id);
    }
}
