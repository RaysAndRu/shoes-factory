package org.example.shoesfactory.services;

import jakarta.persistence.EntityNotFoundException;
import org.example.shoesfactory.models.Client;
import org.example.shoesfactory.models.dto.request.ClientRequestDTO;
import org.example.shoesfactory.models.dto.response.ClientSalesDTO;
import org.example.shoesfactory.repositories.ClientRepository;
import org.example.shoesfactory.services.interfaces.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ClientServiceImpl implements ClientService {
    private final ClientRepository clientRepository;

    @Autowired
    public ClientServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    public void addClient(ClientRequestDTO client) {
        clientRepository.addClient(
                client.getLastName(),
                client.getFirstName(),
                client.getMiddleName(),
                client.getFormOrganization(),
                client.getContactDetails(),
                client.getEmail(),
                client.getPhone(),
                client.getType()
        );
    }

    @Override
    @Transactional
    public Client getClientById(Integer clientId) {
        return clientRepository.getClientById(clientId)
                .orElseThrow(() -> new EntityNotFoundException("Client not found with id: " + clientId));
    }

    @Override
    @Transactional
    public List<Client> getAllClients() {
        return clientRepository.getAllClients();
    }

    @Override
    @Transactional
    public List<Client> getClientsByType(String type) {
        return clientRepository.getClientsByType(type);
    }

    @Override
    @Transactional
    public List<Client> getClientByFormOrganization(String formOrganization) {
        return clientRepository.getClientByFormOrganization(formOrganization);
    }

    @Override
    public void updateClient(Integer id, ClientRequestDTO client) {
        clientRepository.updateClient(
                id,
                client.getLastName(),
                client.getFirstName(),
                client.getMiddleName(),
                client.getFormOrganization(),
                client.getContactDetails(),
                client.getEmail(),
                client.getPhone(),
                client.getType()
        );
    }

    @Override
    public void deleteClient(Integer clientId) {
        clientRepository.deleteClient(clientId);
    }

    @Override
    @Transactional
    public Client getClientByPhone(String phone) {
        return clientRepository.getClientByPhone(phone)
                .orElseThrow(() -> new EntityNotFoundException("Client not found with phone: " + phone));
    }

    @Override
    @Transactional
    public List<ClientSalesDTO> getClientsBySales() {
        return clientRepository.getSalesByClients()
                .stream()
                .map(row -> new ClientSalesDTO(
                        (Integer)  row[0],
                        (String) row[1],
                        (String) row[2],
                        ((Number) row[3]).doubleValue(),
                        ( (Number) row[4]).intValue()
                ))
                .toList();
    }
}
