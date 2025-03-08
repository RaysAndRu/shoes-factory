package org.example.shoesfactory.services.interfaces;

import org.example.shoesfactory.models.ClientOrder;
import org.example.shoesfactory.models.dto.request.ClientOrderRequestDTO;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

public interface ClientOrderService {
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    void addClientOrder(ClientOrderRequestDTO clientOrder);

    @PreAuthorize("hasRole('ROLE_READER')")
    ClientOrder getClientOrderById(Integer clientOrderId);

    @PreAuthorize("hasRole('ROLE_READER')")
    List<ClientOrder> getAllClientOrders();

    @PreAuthorize("hasRole('ROLE_READER')")
    List<ClientOrder> getClientOrdersByClientId(Integer clientId);

    @PreAuthorize("hasRole('ROLE_READER')")
    List<ClientOrder> getClientOrdersByProductId(Integer productId);

    @PreAuthorize("hasRole('ROLE_READER')")
    List<ClientOrder> getClientOrdersByStatus(String status);

    @PreAuthorize("hasRole('ROLE_READER')")
    List<ClientOrder> getClientOrdersByPaymentMethod(String paymentMethod);

    @PreAuthorize("hasRole('ROLE_MANAGER')")
    void updateClientOrder(Integer id, ClientOrderRequestDTO clientOrder);

    @PreAuthorize("hasRole('ROLE_MANAGER')")
    void deleteClientOrder(Integer clientOrderId);
}
