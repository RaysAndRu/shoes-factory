package org.example.shoesfactory.repositories;

import org.example.shoesfactory.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Procedure(procedureName = "add_user")
    void addUser(
            @Param("p_role_id") Integer roleId,
            @Param("p_login") String login,
            @Param("p_password_hash") String passwordHash,
            @Param("p_phone") String phone,
            @Param("p_email") String email,
            @Param("p_status") String status
    );

    @Procedure(procedureName = "get_user_by_id")
    Optional<User>  getUserById(@Param("p_user_id") Integer userId);

    @Procedure(procedureName = "get_all_users")
    List<User> getAllUsers();

    @Procedure(procedureName = "get_user_by_email")
    Optional<User>  getUserByEmail(@Param("p_email") String email);

    @Procedure(procedureName = "get_user_by_login")
    Optional<User>  getUserByLogin(@Param("p_login") String login);

    @Procedure(procedureName = "get_users_by_status")
    List<User>  getUsersByStatus(@Param("p_status") String status);

    @Procedure(procedureName = "update_user")
    void updateUser(
            @Param("p_user_id") Integer userId,
            @Param("p_role_id") Integer roleId,
            @Param("p_login") String login,
            @Param("p_password_hash") String passwordHash,
            @Param("p_phone") String phone,
            @Param("p_email") String email,
            @Param("p_status") String status
    );

    @Procedure(procedureName = "delete_user")
    void deleteUser(@Param("p_user_id") Integer userId);

    @Procedure(procedureName = "update_user_password")
    void updateUserPassword(
            @Param("p_user_id") Integer userId,
            @Param("p_new_password_hash") String newPasswordHash
    );
}
