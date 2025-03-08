package org.example.shoesfactory.configs;

import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.example.shoesfactory.models.Role;
import org.example.shoesfactory.models.User;
import org.example.shoesfactory.repositories.RoleRepository;
import org.example.shoesfactory.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private static final Logger logger = LogManager.getLogger(DataInitializer.class);

    @Autowired
    public DataInitializer(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        checkAndCreateRole("ROLE_ADMIN", "ALL PERMISSIONS PROVIDED TO ADMIN");
        checkAndCreateRole("ROLE_MANAGER", "MANAGER PERMISSIONS");
        checkAndCreateRole("ROLE_READER", "READ-ONLY PERMISSIONS");

        checkAndCreateUser("admin",  passwordEncoder.encode("admin"),  "ROLE_ADMIN", "Активен", "raisandrey@mail.ru", "+79085566354");
        checkAndCreateUser("manager", passwordEncoder.encode("manager"), "ROLE_MANAGER", "Активен", "example1@email.com" ,"+79065566354" );
        checkAndCreateUser("reader", passwordEncoder.encode("reader"), "ROLE_READER", "Активен","example2@email.com" ,"+79685566354");
    }


    private void checkAndCreateRole(String roleTitle, String description) {
        Optional<Role> role = roleRepository.getRoleByTitle(roleTitle);
        if (role.isEmpty()) {
            roleRepository.addRole(roleTitle, description);
            logger.info("Role '" + roleTitle + "' was created successfully");
        }
    }

    private void checkAndCreateUser(String username, String password, String roleTitle, String status, String email, String phone) {
        Optional<User> user = userRepository.getUserByLogin(username);
        if (user.isEmpty()) {
            Optional<Role> role = roleRepository.getRoleByTitle(roleTitle);
            if (role.isPresent()) {
                userRepository.addUser(role.get().getId(), username, password, phone, email, status);
                logger.info("User '" + username + "' with role '" + roleTitle + "' was created successfully");
            } else {
                logger.info("Error: Role '" + roleTitle + "' not found. User '" + username + "' was not created.");
            }
        }
    }

}
