package org.example.shoesfactory.services.interfaces;


import org.example.shoesfactory.models.ProductWarehouse;
import org.example.shoesfactory.models.dto.request.ProductWarehouseRequestDTO;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

public interface ProductWarehouseService {
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    void addProductWarehouse(ProductWarehouseRequestDTO productWarehouse);

    @PreAuthorize("hasRole('ROLE_READER')")
    ProductWarehouse getProductWarehouseById(Integer productWarehouseId);

    @PreAuthorize("hasRole('ROLE_READER')")
    List<ProductWarehouse> getAllProductWarehouses();

    @PreAuthorize("hasRole('ROLE_READER')")
    List<ProductWarehouse> getProductWarehousesByProduct(Integer productId);

    @PreAuthorize("hasRole('ROLE_MANAGER')")
    void updateProductWarehouse(Integer id, ProductWarehouseRequestDTO productWarehouse);

    @PreAuthorize("hasRole('ROLE_MANAGER')")
    void deleteProductWarehouse(Integer productWarehouseId);
}
