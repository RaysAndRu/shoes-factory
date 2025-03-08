package org.example.shoesfactory.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.shoesfactory.models.ProductionOrder;
import org.example.shoesfactory.models.dto.request.ProductionOrderRequestDTO;
import org.example.shoesfactory.repositories.ProductionOrderRepository;
import org.example.shoesfactory.services.interfaces.ProductionOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductionOrderServiceImpl implements ProductionOrderService {
    private final ProductionOrderRepository productionOrderRepository;

    @Autowired
    public ProductionOrderServiceImpl(ProductionOrderRepository productionOrderRepository) {
        this.productionOrderRepository = productionOrderRepository;
    }

    @Override
    public void addProductionOrder(ProductionOrderRequestDTO productionOrder) {
        productionOrderRepository.addProductionOrder(
                productionOrder.getProductId(),
                productionOrder.getQuantity(),
                productionOrder.getPlannedCompletionDate(),
                productionOrder.getStatus()
        );
    }

    @Override
    @Transactional
    public ProductionOrder getProductionOrderById(Integer productionOrderId) throws EntityNotFoundException {
        return productionOrderRepository.getProductionOrderById(productionOrderId)
                .orElseThrow(() -> new EntityNotFoundException("Production order with id " + productionOrderId + " not found"));
    }

    @Override
    @Transactional
    public List<ProductionOrder> getAllProductionOrders() {
        return productionOrderRepository.getAllProductionOrders();
    }

    @Override
    @Transactional
    public List<ProductionOrder> getProductionOrdersByStatus(String status) {
        return productionOrderRepository.getProductionOrdersByStatus(status);
    }

    @Override
    public void updateProductionOrder(Integer id, ProductionOrderRequestDTO productionOrder) throws EntityNotFoundException {
        productionOrderRepository.updateProductionOrder(
                id,
                productionOrder.getProductId(),
                productionOrder.getQuantity(),
                productionOrder.getPlannedCompletionDate(),
                productionOrder.getActualCompletionDate(),
                productionOrder.getStatus()
        );
    }

    @Override
    @Transactional
    public void deleteProductionOrder(Integer productionOrderId) throws EntityNotFoundException {
        productionOrderRepository.getProductionOrderById(productionOrderId)
                .orElseThrow(() -> new EntityNotFoundException("Production order with id " + productionOrderId + " not found"));
        productionOrderRepository.deleteProductionOrder(productionOrderId);
    }
}
