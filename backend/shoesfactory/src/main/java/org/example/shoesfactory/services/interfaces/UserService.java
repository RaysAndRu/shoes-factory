package org.example.shoesfactory.services.interfaces;

import org.example.shoesfactory.models.User;
import org.example.shoesfactory.models.dto.request.UserRequestDTO;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.Optional;
@PreAuthorize("hasRole('ROLE_ADMIN')")
public interface UserService {
    void addUser(UserRequestDTO user);
    User getUserById(Integer userId);
    List<User> getAllUsers();
    List<User> getUsersByStatus(String status);
    User getUserByEmail(String email);
    void updateUser(Integer id, UserRequestDTO user);
    void deleteUser(Integer userId);
    void updateUserPassword(Integer userId, String newPasswordHash);
}
