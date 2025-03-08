package org.example.shoesfactory.services;

import jakarta.persistence.EntityNotFoundException;
import org.example.shoesfactory.models.Warehouse;
import org.example.shoesfactory.models.dto.request.WarehouseRequestDTO;
import org.example.shoesfactory.models.dto.response.WarehouseProductAvgDTO;

import org.example.shoesfactory.repositories.WarehouseRepository;
import org.example.shoesfactory.services.interfaces.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WarehouseServiceImpl implements WarehouseService {
    private final WarehouseRepository warehouseRepository;


    @Autowired
    public WarehouseServiceImpl(WarehouseRepository warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }

    @Override
    public void addWarehouse(WarehouseRequestDTO warehouse) {
        System.out.println(warehouse);
        warehouseRepository.addWarehouse(
                warehouse.getResponsibleEmployeeId(),
                warehouse.getAddress(),
                warehouse.getPhone(),
                warehouse.getProductQuantity()
        );
    }

    @Override
    @Transactional
    public Warehouse getWarehouseById(Integer warehouseId) {
        return warehouseRepository.getWarehouseById(warehouseId)
                .orElseThrow(() -> new EntityNotFoundException("Warehouse not found with id: " + warehouseId));
    }

    @Override
    public void updateWarehouse(Integer id, WarehouseRequestDTO warehouse) {
        warehouseRepository.updateWarehouse(
                id,
                warehouse.getResponsibleEmployeeId(),
                warehouse.getAddress(),
                warehouse.getPhone(),
                warehouse.getProductQuantity()
        );
    }

    @Override
    public void deleteWarehouse(Integer warehouseId) {
        warehouseRepository.deleteWarehouse(warehouseId);
    }

    @Override
    @Transactional
    public Warehouse getWarehouseByPhone(String phone) {
        return warehouseRepository.getWarehouseByPhone(phone)
                .orElseThrow(() -> new EntityNotFoundException("Warehouse not found with phone: " + phone));
    }

    @Override
    @Transactional
    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.getAllWarehouse();
    }

    @Override
    @Transactional
    public List<WarehouseProductAvgDTO> getAverageProductQuantityPerWarehouse() {
        return  warehouseRepository.analyzeAverageProductQuantityPerWarehouse()
                .stream()
                .map(row -> new WarehouseProductAvgDTO(
                        (Integer)  row[0],
                        (String)  row[1],
                        ((Number)  row[2]).doubleValue()
                ))
                .toList();
    }
}
