package org.example.shoesfactory.controllers;



import org.example.shoesfactory.models.ProductWarehouse;
import org.example.shoesfactory.models.dto.request.ProductWarehouseRequestDTO;
import org.example.shoesfactory.services.interfaces.ProductWarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/product-warehouses")
public class ProductWarehouseControllerV1 {
    private final ProductWarehouseService productWarehouseService;

    @Autowired
    public ProductWarehouseControllerV1(ProductWarehouseService productWarehouseService) {
        this.productWarehouseService = productWarehouseService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> addProductWarehouse(@RequestBody ProductWarehouseRequestDTO productWarehouse) {
        productWarehouseService.addProductWarehouse(productWarehouse);
        return new ResponseEntity<>("ProductWarehouse created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductWarehouse> getProductWarehouseById(@PathVariable("id") Integer productWarehouseId) {
        ProductWarehouse productWarehouse = productWarehouseService.getProductWarehouseById(productWarehouseId);
        return productWarehouse != null ? new ResponseEntity<>(productWarehouse, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProductWarehouse>> getAllProductWarehouses() {
        List<ProductWarehouse> productWarehouses = productWarehouseService.getAllProductWarehouses();
        return new ResponseEntity<>(productWarehouses, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateProductWarehouse(@PathVariable("id") Integer productWarehouseId, @RequestBody ProductWarehouseRequestDTO productWarehouse) {
        ProductWarehouse existingProductWarehouse = productWarehouseService.getProductWarehouseById(productWarehouseId);
        if (existingProductWarehouse != null) {
            productWarehouseService.updateProductWarehouse(productWarehouseId,productWarehouse);
            return new ResponseEntity<>("ProductWarehouse updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("ProductWarehouse not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProductWarehouse(@PathVariable("id") Integer productWarehouseId) {
        ProductWarehouse existingProductWarehouse = productWarehouseService.getProductWarehouseById(productWarehouseId);
        if (existingProductWarehouse != null) {
            productWarehouseService.deleteProductWarehouse(productWarehouseId);
            return new ResponseEntity<>("ProductWarehouse deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("ProductWarehouse not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ProductWarehouse>> getProductWarehousesByProduct(@PathVariable("productId") Integer productId) {
        List<ProductWarehouse> productWarehouses = productWarehouseService.getProductWarehousesByProduct(productId);
        return new ResponseEntity<>(productWarehouses, HttpStatus.OK);
    }
}
