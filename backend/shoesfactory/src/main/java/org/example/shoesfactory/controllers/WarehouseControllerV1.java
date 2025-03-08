package org.example.shoesfactory.controllers;



import org.example.shoesfactory.models.Warehouse;
import org.example.shoesfactory.models.dto.response.WarehouseProductAvgDTO;
import org.example.shoesfactory.models.dto.request.WarehouseRequestDTO;
import org.example.shoesfactory.services.interfaces.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/warehouses")
public class WarehouseControllerV1 {
    private final WarehouseService warehouseService;

    @Autowired
    public WarehouseControllerV1(WarehouseService warehouseService) {
        this.warehouseService = warehouseService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> addWarehouse(@RequestBody WarehouseRequestDTO warehouse) {
        warehouseService.addWarehouse(warehouse);
        return new ResponseEntity<>("Warehouse created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Warehouse> getWarehouseById(@PathVariable("id") Integer warehouseId) {
        Warehouse warehouse = warehouseService.getWarehouseById(warehouseId);
        return warehouse != null ? new ResponseEntity<>(warehouse, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Warehouse>> getAllWarehouses() {
        List<Warehouse> warehouses = warehouseService.getAllWarehouses();
        return new ResponseEntity<>(warehouses, HttpStatus.OK);
    }

    @GetMapping("/phone/{phone}")
    public ResponseEntity<Warehouse> getWarehouseByPhone(@PathVariable("phone") String phone) {
        Warehouse warehouse = warehouseService.getWarehouseByPhone(phone);
        return warehouse != null ? new ResponseEntity<>(warehouse, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/all/average-products")
    public ResponseEntity<List<WarehouseProductAvgDTO>> getAllWarehousesByLocation() {
        List<WarehouseProductAvgDTO>  body = warehouseService.getAverageProductQuantityPerWarehouse();
        return  body.isEmpty()? new ResponseEntity<>(HttpStatus.NOT_FOUND):new ResponseEntity<>(body, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateWarehouse(@PathVariable("id") Integer warehouseId, @RequestBody WarehouseRequestDTO warehouse) {
        Warehouse existingWarehouse = warehouseService.getWarehouseById(warehouseId);
        if (existingWarehouse != null) {
            warehouseService.updateWarehouse(warehouseId,warehouse);
            return new ResponseEntity<>("Warehouse updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Warehouse not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteWarehouse(@PathVariable("id") Integer warehouseId) {
        Warehouse existingWarehouse = warehouseService.getWarehouseById(warehouseId);
        if (existingWarehouse != null) {
            warehouseService.deleteWarehouse(warehouseId);
            return new ResponseEntity<>("Warehouse deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Warehouse not found", HttpStatus.NOT_FOUND);
        }
    }
}
