package org.example.shoesfactory.controllers;

import org.example.shoesfactory.models.ProductionOrder;
import org.example.shoesfactory.models.dto.request.ProductionOrderRequestDTO;
import org.example.shoesfactory.services.interfaces.ProductionOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/production-orders")
public class ProductionOrderControllerV1 {
    private ProductionOrderService productionOrderService;

    @Autowired
    public ProductionOrderControllerV1(ProductionOrderService productionOrderService) {
        this.productionOrderService = productionOrderService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> addProductionOrder(@RequestBody ProductionOrderRequestDTO productionOrder) {
        productionOrderService.addProductionOrder(productionOrder);
        return new ResponseEntity<>("Production order created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductionOrder> getProductionOrderById(@PathVariable("id") Integer productionOrderId) {
        ProductionOrder productionOrder = productionOrderService.getProductionOrderById(productionOrderId);
        if (productionOrder != null) {
            return new ResponseEntity<>(productionOrder, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProductionOrder>> getAllProductionOrders() {
        List<ProductionOrder> productionOrders = productionOrderService.getAllProductionOrders();
        return new ResponseEntity<>(productionOrders, HttpStatus.OK);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ProductionOrder>> getProductionOrdersByStatus(@PathVariable String status) {
        List<ProductionOrder> productionOrders = productionOrderService.getProductionOrdersByStatus(status);
        if (productionOrders != null && !productionOrders.isEmpty()) {
            return new ResponseEntity<>(productionOrders, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateProductionOrder(@PathVariable("id") Integer productionOrderId, @RequestBody ProductionOrderRequestDTO productionOrder) {
        ProductionOrder existingOrder = productionOrderService.getProductionOrderById(productionOrderId);
        if (existingOrder != null) {
            productionOrderService.updateProductionOrder(productionOrderId, productionOrder);
            return new ResponseEntity<>("Production order updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Production order not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProductionOrder(@PathVariable("id") Integer productionOrderId) {
        ProductionOrder existingOrder = productionOrderService.getProductionOrderById(productionOrderId);
        if (existingOrder != null) {
            productionOrderService.deleteProductionOrder(productionOrderId);
            return new ResponseEntity<>("Production order deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Production order not found", HttpStatus.NOT_FOUND);
        }
    }
}
