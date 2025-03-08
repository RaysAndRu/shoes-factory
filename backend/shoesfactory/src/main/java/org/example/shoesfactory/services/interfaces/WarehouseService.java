package org.example.shoesfactory.services.interfaces;

import org.example.shoesfactory.models.Warehouse;
import org.example.shoesfactory.models.dto.response.WarehouseProductAvgDTO;
import org.example.shoesfactory.models.dto.request.WarehouseRequestDTO;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

public interface WarehouseService {
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    void addWarehouse(WarehouseRequestDTO warehouse);

    @PreAuthorize("hasRole('ROLE_READER')")
    Warehouse getWarehouseById(Integer warehouseId);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    void updateWarehouse(Integer id,WarehouseRequestDTO warehouse);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    void deleteWarehouse(Integer warehouseId);

    @PreAuthorize("hasRole('ROLE_READER')")
    Warehouse getWarehouseByPhone(String phone);

    @PreAuthorize("hasRole('ROLE_READER')")
    List<Warehouse> getAllWarehouses();

    @PreAuthorize("hasRole('ROLE_READER')")
    List<WarehouseProductAvgDTO>  getAverageProductQuantityPerWarehouse();
}
