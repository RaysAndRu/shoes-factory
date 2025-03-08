package org.example.shoesfactory.repositories;

import org.example.shoesfactory.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    @Procedure(procedureName = "add_role")
    void addRole(@Param("p_title") String title, @Param("p_description") String description);

    @Procedure(procedureName = "get_role_by_id")
    Optional<Role>  getRoleById(@Param("p_role_id") Integer roleId);

    @Procedure(procedureName = "get_all_roles")
    List<Role> getAllRoles();

    @Procedure(procedureName = "update_role")
    void updateRole(@Param("p_role_id") Integer roleId,
                    @Param("p_title") String title,
                    @Param("p_description") String description);

    @Procedure(procedureName = "delete_role")
    void deleteRole(@Param("p_role_id") Integer roleId);

    @Procedure(procedureName = "get_role_by_title")
    Optional<Role>  getRoleByTitle(@Param("p_title") String title);
}
