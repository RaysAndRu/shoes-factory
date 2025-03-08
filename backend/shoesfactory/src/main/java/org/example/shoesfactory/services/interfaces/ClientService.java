package org.example.shoesfactory.services.interfaces;

import org.example.shoesfactory.models.Client;
import org.example.shoesfactory.models.dto.request.ClientRequestDTO;
import org.example.shoesfactory.models.dto.response.ClientSalesDTO;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

public interface ClientService {
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    void  addClient(ClientRequestDTO client);

    @PreAuthorize("hasRole('ROLE_READER')")
    Client getClientById(Integer clientId);

    @PreAuthorize("hasRole('ROLE_READER')")
    List<Client> getAllClients();

    @PreAuthorize("hasRole('ROLE_READER')")
    List<Client> getClientsByType(String type);

    @PreAuthorize("hasRole('ROLE_READER')")
    List<Client> getClientByFormOrganization(String formOrganization);

    @PreAuthorize("hasRole('ROLE_MANAGER')")
    void updateClient(Integer id ,ClientRequestDTO client);

    @PreAuthorize("hasRole('ROLE_MANAGER')")
    void deleteClient(Integer clientId);

    @PreAuthorize("hasRole('ROLE_READER')")
    Client getClientByPhone(String phone);

    @PreAuthorize("hasRole('ROLE_READER')")
    List<ClientSalesDTO> getClientsBySales();
}
