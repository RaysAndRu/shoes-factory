package org.example.shoesfactory.repositories;

import org.example.shoesfactory.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {

    // Добавление клиента
    @Procedure(procedureName = "add_client")
    void addClient(
            @Param("p_last_name") String lastName,
            @Param("p_first_name") String firstName,
            @Param("p_middle_name") String middleName,
            @Param("p_form_organization") String form_organization,
            @Param("p_contact_details") String contactDetails,
            @Param("p_email") String email,
            @Param("p_phone") String phone,
            @Param("p_type") String type
    );

    // Получение клиента по ID
    @Procedure(procedureName = "get_client_by_id")
    Optional<Client>  getClientById(@Param("p_client_id") Integer clientId);

    // Получение всех клиентов
    @Procedure(procedureName = "get_all_clients")
    List<Client> getAllClients();

    @Procedure(procedureName = "get_clients_by_type")
    List<Client> getClientsByType(@Param("p_type") String type);

    // Обновление информации о клиенте
    @Procedure(procedureName = "update_client")
    void updateClient(
            @Param("p_client_id") Integer clientId,
            @Param("p_last_name") String lastName,
            @Param("p_first_name") String firstName,
            @Param("p_middle_name") String middleName,
            @Param("p_form_organization") String form_organization,
            @Param("p_contact_details") String contactDetails,
            @Param("p_email") String email,
            @Param("p_phone") String phone,
            @Param("p_type") String type
    );

    // Удаление клиента
    @Procedure(procedureName = "delete_client")
    void deleteClient(@Param("p_client_id") Integer clientId);

    // Получение клиентов по фамилии (поиск с LIKE)
    @Procedure(procedureName = "get_client_by_form_organization")
    List<Client> getClientByFormOrganization(@Param("p_form_organization") String formOrganization);

    // Получение клиента по номеру телефона
    @Procedure(procedureName = "get_client_by_phone")
    Optional<Client>  getClientByPhone(@Param("p_phone") String phone);

    @Procedure(procedureName = "analyze_sales_by_clients")
    List<Object[]> getSalesByClients();
}
