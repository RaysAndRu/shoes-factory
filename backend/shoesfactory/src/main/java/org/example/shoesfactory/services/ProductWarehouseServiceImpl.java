package org.example.shoesfactory.services;

import jakarta.persistence.EntityNotFoundException;
import org.example.shoesfactory.models.ProductWarehouse;
import org.example.shoesfactory.models.dto.request.ProductWarehouseRequestDTO;
import org.example.shoesfactory.repositories.ProductWarehouseRepository;
import org.example.shoesfactory.services.interfaces.ProductService;
import org.example.shoesfactory.services.interfaces.ProductWarehouseService;
import org.example.shoesfactory.services.interfaces.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductWarehouseServiceImpl implements ProductWarehouseService {
    private final ProductWarehouseRepository productWarehouseRepository;


    @Autowired
    public ProductWarehouseServiceImpl(ProductWarehouseRepository productWarehouseRepository, ProductService productService, WarehouseService warehouseService) {
        this.productWarehouseRepository = productWarehouseRepository;
    }

    @Override
    public void addProductWarehouse(ProductWarehouseRequestDTO productWarehouse) {
        // Добавляем связь между продуктом и складом
        productWarehouseRepository.addProductWarehouse(
                productWarehouse.getProductId(),
                productWarehouse.getWarehouseId(),
                productWarehouse.getQuantity()
        );
    }

    @Override
    @Transactional
    public ProductWarehouse getProductWarehouseById(Integer productWarehouseId) {
        // Получаем связь между продуктом и складом по ID
        return productWarehouseRepository.getProductWarehouseById(productWarehouseId)
                .orElseThrow(() -> new EntityNotFoundException("ProductWarehouse not found with ID: " + productWarehouseId));
    }

    @Override
    @Transactional
    public List<ProductWarehouse> getAllProductWarehouses() {
        // Получаем все связи между продуктами и складами
        return productWarehouseRepository.getAllProductWarehouses();
    }

    @Override
    public void updateProductWarehouse(Integer id, ProductWarehouseRequestDTO productWarehouse) {
        // Обновляем связь между продуктом и складом
        productWarehouseRepository.updateProductWarehouse(
                id,
                productWarehouse.getProductId(),
                productWarehouse.getWarehouseId(),
                productWarehouse.getQuantity()
        );
    }

    @Override
    public void deleteProductWarehouse(Integer productWarehouseId) {
        // Удаляем связь между продуктом и складом
        productWarehouseRepository.deleteProductWarehouse(productWarehouseId);
    }

    @Override
    @Transactional
    public List<ProductWarehouse> getProductWarehousesByProduct(Integer productId) {
        // Получаем все склады для конкретного продукта
        return productWarehouseRepository.getProductWarehouseByProductId(productId);
    }
}
