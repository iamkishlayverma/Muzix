package com.project.musicapp.config;

import com.project.musicapp.model.User;
import com.project.musicapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
@PropertySource(value = "startup.properties")
public class StartupApplicationListener implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Environment environment;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        User user = new User();
        user.setEmail(environment.getProperty("user1Email"));
        user.setUsername(environment.getProperty("user1Username"));
        user.setPassword(environment.getProperty("user1Password"));
        userRepository.save(user);

        user = new User();
        user.setEmail(environment.getProperty("user2Email"));
        user.setUsername(environment.getProperty("user2Username"));
        user.setPassword(environment.getProperty("user2Password"));
        userRepository.save(user);

        user = new User();
        user.setEmail(environment.getProperty("user3Email"));
        user.setUsername(environment.getProperty("user3Username"));
        user.setPassword(environment.getProperty("user3Password"));
        userRepository.save(user);
    }
}
