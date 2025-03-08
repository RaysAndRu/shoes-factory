package org.example.shoesfactory.services;


import lombok.RequiredArgsConstructor;
import org.example.shoesfactory.models.ClientOrder;
import org.example.shoesfactory.models.dto.request.ClientOrderRequestDTO;
import org.example.shoesfactory.models.dto.request.ClientRequestDTO;
import org.example.shoesfactory.repositories.ClientOrderRepository;
import org.example.shoesfactory.services.interfaces.ClientOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ClientOrderServiceImpl implements ClientOrderService {
    private final ClientOrderRepository clientOrderRepository;

    @Autowired
    public ClientOrderServiceImpl(ClientOrderRepository clientOrderRepository) {
        this.clientOrderRepository = clientOrderRepository;
    }

    @Override
    public void addClientOrder(ClientOrderRequestDTO clientOrder) {
        clientOrderRepository.addClientOrder(
                clientOrder.getClientId(),
                clientOrder.getProductId(),
                clientOrder.getQuantity(),
                clientOrder.getExpectedDeliveryDate(),
                clientOrder.getDeliveryAddress(),
                clientOrder.getPaymentMethod(),
                clientOrder.getStatus()
        );
    }

    @Override
    @Transactional
    public ClientOrder getClientOrderById(Integer clientOrderId) {
        return clientOrderRepository.getClientOrderById(clientOrderId)
                .orElse(null);
    }

    @Override
    @Transactional
    public List<ClientOrder> getAllClientOrders() {
        return clientOrderRepository.getAllClientOrders();
    }

    @Override
    @Transactional
    public List<ClientOrder> getClientOrdersByClientId(Integer clientId) {
        return clientOrderRepository.getClientOrdersByClientId(clientId);
    }

    @Override
    @Transactional
    public List<ClientOrder> getClientOrdersByProductId(Integer productId) {
        return clientOrderRepository.getClientOrdersByProductId(productId);
    }

    @Override
    @Transactional
    public List<ClientOrder> getClientOrdersByStatus(String status) {
        return  clientOrderRepository.getClientOrdersByStatus(status);
    }

    @Override
    @Transactional
    public List<ClientOrder> getClientOrdersByPaymentMethod(String paymentMethod) {
        return  clientOrderRepository.getClientOrdersByPaymentMethod(paymentMethod);
    }

    @Override
    public void updateClientOrder(Integer id, ClientOrderRequestDTO clientOrder) {
        clientOrderRepository.updateClientOrder(
                id,
                clientOrder.getClientId(),
                clientOrder.getProductId(),
                clientOrder.getQuantity(),
                clientOrder.getExpectedDeliveryDate(),
                clientOrder.getDeliveryAddress(),
                clientOrder.getPaymentMethod(),
                clientOrder.getStatus()
        );
    }

    @Override
    public void deleteClientOrder(Integer clientOrderId) {
        clientOrderRepository.deleteClientOrder(clientOrderId);
    }
}
