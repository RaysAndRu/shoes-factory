package org.example.shoesfactory.controllers;

import org.example.shoesfactory.models.Client;
import org.example.shoesfactory.models.dto.request.ClientRequestDTO;
import org.example.shoesfactory.models.dto.response.ClientSalesDTO;
import org.example.shoesfactory.services.interfaces.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clients")
public class ClientControllerV1 {
    private  final ClientService clientService;

    @Autowired
    public ClientControllerV1(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> addClient(@RequestBody ClientRequestDTO client) {
        clientService.addClient(client);
        return new ResponseEntity<>("Client created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable("id") Integer clientId) {
        Client client = clientService.getClientById(clientId);
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all/sales")
    public ResponseEntity<List<ClientSalesDTO>> getClientsBySales(){
        List<ClientSalesDTO> clientsSales = clientService.getClientsBySales();
        if (clientsSales!= null &&!clientsSales.isEmpty()) {
            return new ResponseEntity<>(clientsSales, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Client>> getAllClients() {
        List<Client> clients = clientService.getAllClients();
        return new ResponseEntity<>(clients, HttpStatus.OK);
    }

    @GetMapping("/organization/{organization}")
    public ResponseEntity<List<Client>> getClientByLastName(@PathVariable("organization") String organization) {
        List<Client> clients = clientService.getClientByFormOrganization(organization);
        if (clients != null && !clients.isEmpty()) {
            return new ResponseEntity<>(clients, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/phone/{phone}")
    public ResponseEntity<Client> getClientByPhone(@PathVariable String phone) {
        Client client = clientService.getClientByPhone(phone);
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Client>> getClientByType(@PathVariable("type") String type) {
        List<Client> clients = clientService.getClientsByType(type);
        if (clients!= null &&!clients.isEmpty()) {
            return new ResponseEntity<>(clients, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateClient(@PathVariable("id") Integer clientId, @RequestBody ClientRequestDTO client) {
        Client existingClient = clientService.getClientById(clientId);
        if (existingClient != null) {
            clientService.updateClient(clientId, client);
            return new ResponseEntity<>("Client updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Client not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteClient(@PathVariable("id") Integer clientId) {
        Client existingClient = clientService.getClientById(clientId);
        if (existingClient != null) {
            clientService.deleteClient(clientId);
            return new ResponseEntity<>("Client deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Client not found", HttpStatus.NOT_FOUND);
        }

    }


}
