package org.example.shoesfactory.services.interfaces;

import org.example.shoesfactory.models.ProductionOrder;
import org.example.shoesfactory.models.dto.request.ProductionOrderRequestDTO;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

public interface ProductionOrderService {
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    void addProductionOrder(ProductionOrderRequestDTO productionOrder);

    @PreAuthorize("hasRole('ROLE_READER')")
    ProductionOrder getProductionOrderById(Integer productionOrderId);

    @PreAuthorize("hasRole('ROLE_READER')")
    List<ProductionOrder> getAllProductionOrders();

    @PreAuthorize("hasRole('ROLE_READER')")
    List<ProductionOrder> getProductionOrdersByStatus(String status);

    @PreAuthorize("hasRole('ROLE_MANAGER')")
    void updateProductionOrder(Integer id, ProductionOrderRequestDTO productionOrder) ;

    @PreAuthorize("hasRole('ROLE_MANAGER')")
    void deleteProductionOrder(Integer productionOrderId) ;
}
