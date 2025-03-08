package org.example.shoesfactory.controllers;

import org.example.shoesfactory.models.ClientOrder;
import org.example.shoesfactory.models.dto.request.ClientOrderRequestDTO;
import org.example.shoesfactory.services.interfaces.ClientOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/client-orders")
public class ClientOrderControllerV1 {
    private final ClientOrderService clientOrderService;

    @Autowired
    public ClientOrderControllerV1(ClientOrderService clientOrderService) {
        this.clientOrderService = clientOrderService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> addClientOrder(@RequestBody ClientOrderRequestDTO clientOrder) {
        clientOrderService.addClientOrder(clientOrder);
        return new ResponseEntity<>("Client order created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientOrder> getClientOrderById(@PathVariable("id") Integer clientOrderId) {
        ClientOrder clientOrder = clientOrderService.getClientOrderById(clientOrderId);
        if (clientOrder != null) {
            return new ResponseEntity<>(clientOrder, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<ClientOrder>> getAllClientOrders() {
        List<ClientOrder> clientOrders = clientOrderService.getAllClientOrders();
        return new ResponseEntity<>(clientOrders, HttpStatus.OK);
    }

    @GetMapping("/client/{id}")
    public ResponseEntity<List<ClientOrder>> getClientOrdersByClientId(@PathVariable("id") Integer clientId) {
        List<ClientOrder> clientOrders = clientOrderService.getClientOrdersByClientId(clientId);
        if (clientOrders != null && !clientOrders.isEmpty()) {
            return new ResponseEntity<>(clientOrders, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<List<ClientOrder>> getClientOrdersByProductId(@PathVariable("id") Integer productId) {
        List<ClientOrder> clientOrders = clientOrderService.getClientOrdersByProductId(productId);
        if (clientOrders != null && !clientOrders.isEmpty()) {
            return new ResponseEntity<>(clientOrders, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ClientOrder>> getClientOrdersByStatus(@PathVariable String status) {
        List<ClientOrder> clientOrders = clientOrderService.getClientOrdersByStatus(status);
        if (clientOrders!= null &&!clientOrders.isEmpty()) {
            return new ResponseEntity<>(clientOrders, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/payment-method/{method}")
    public ResponseEntity<List<ClientOrder>> getClientOrdersByPaymentMethod(@PathVariable String method) {
        List<ClientOrder> clientOrders = clientOrderService.getClientOrdersByPaymentMethod(method);
        if (clientOrders!= null &&!clientOrders.isEmpty()) {
            return new ResponseEntity<>(clientOrders, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateClientOrder(@PathVariable("id") Integer clientOrderId, @RequestBody ClientOrderRequestDTO clientOrder) {
        ClientOrder existingOrder = clientOrderService.getClientOrderById(clientOrderId);
        if (existingOrder != null) {
            clientOrderService.updateClientOrder(clientOrderId, clientOrder);
            return new ResponseEntity<>("Client order updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Client order not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteClientOrder(@PathVariable("id") Integer clientOrderId) {
        ClientOrder existingOrder = clientOrderService.getClientOrderById(clientOrderId);
        if (existingOrder != null) {
            clientOrderService.deleteClientOrder(clientOrderId);
            return new ResponseEntity<>("Client order deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Client order not found", HttpStatus.NOT_FOUND);
        }
    }
}
