package org.example.shoesfactory.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.shoesfactory.models.Role;
import org.example.shoesfactory.models.User;
import org.example.shoesfactory.models.dto.request.UserRequestDTO;
import org.example.shoesfactory.repositories.RoleRepository;
import org.example.shoesfactory.repositories.UserRepository;
import org.example.shoesfactory.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    @Override
    public void addUser(UserRequestDTO user) {
        Role role = findRoleByTitle(user.getRoleTitle());
        userRepository.addUser(
                role.getId(),
                user.getLogin(),
                passwordEncoder.encode( user.getPasswordHash()),
                user.getPhone(),
                user.getEmail(),
                user.getStatus()
        );
    }

    @Override
    @Transactional
    public User getUserById(Integer userId) {
        return userRepository.getUserById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @Override
    @Transactional
    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }

    @Override
    @Transactional
    public List<User> getUsersByStatus(String status) {
        return  userRepository.getUsersByStatus(status);
    }

    @Override
    @Transactional
    public User getUserByEmail(String email) {
        return userRepository.getUserByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @Override
    public void updateUser(Integer id, UserRequestDTO user) {
        Role role = findRoleByTitle(user.getRoleTitle());
        userRepository.updateUser(
                id,
                role.getId(),
                user.getLogin(),
                passwordEncoder.encode( user.getPasswordHash()),
                user.getPhone(),
                user.getEmail(),
                user.getStatus()
        );
    }

    @Override
    public void deleteUser(Integer userId) {
        userRepository.deleteUser(userId);
    }

    @Override
    public void updateUserPassword(Integer userId, String newPasswordHash) {
        userRepository.updateUserPassword(userId, passwordEncoder.encode(newPasswordHash));
    }
    private Role findRoleByTitle(String title){
        return roleRepository.getRoleByTitle(title)
               .orElseThrow(() -> new EntityNotFoundException("Role not found"));
    }
}