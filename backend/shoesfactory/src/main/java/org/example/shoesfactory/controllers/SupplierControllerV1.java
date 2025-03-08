package org.example.shoesfactory.controllers;



import lombok.RequiredArgsConstructor;

import org.example.shoesfactory.models.Supplier;
import org.example.shoesfactory.models.dto.request.SupplierRequestDTO;
import org.example.shoesfactory.services.interfaces.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/suppliers")
public class SupplierControllerV1 {
    private final SupplierService supplierService;

    @Autowired
    public SupplierControllerV1(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> addSupplier(@RequestBody SupplierRequestDTO supplier) {
        supplierService.addSupplier(supplier);
        return new ResponseEntity<>("Supplier created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable("id") Integer supplierId) {
        Supplier supplier = supplierService.getSupplierById(supplierId);
        return supplier != null ? new ResponseEntity<>(supplier, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Supplier>> getAllSuppliers() {
        List<Supplier> suppliers = supplierService.getAllSuppliers();
        return new ResponseEntity<>(suppliers, HttpStatus.OK);
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<List<Supplier>> getSuppliersByTitle(@PathVariable("title") String title) {
        List<Supplier> suppliers = supplierService.getSuppliersByTitle(title);
        return (suppliers != null && !suppliers.isEmpty()) ? new ResponseEntity<>(suppliers, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateSupplier(@PathVariable("id") Integer supplierId, @RequestBody SupplierRequestDTO supplier) {
        Supplier existingSupplier = supplierService.getSupplierById(supplierId);
        if (existingSupplier != null) {
            supplierService.updateSupplier(supplierId,supplier);
            return new ResponseEntity<>("Supplier updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Supplier not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSupplier(@PathVariable("id") Integer supplierId) {
        Supplier existingSupplier = supplierService.getSupplierById(supplierId);
        if (existingSupplier != null) {
            supplierService.deleteSupplier(supplierId);
            return new ResponseEntity<>("Supplier deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Supplier not found", HttpStatus.NOT_FOUND);
        }
    }
}
