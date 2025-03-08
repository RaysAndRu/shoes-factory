package org.example.shoesfactory.controllers;

import lombok.RequiredArgsConstructor;
import org.example.shoesfactory.models.Material;
import org.example.shoesfactory.models.dto.request.MaterialRequestDTO;
import org.example.shoesfactory.services.interfaces.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/materials")
@RequiredArgsConstructor
public class MaterialControllerV1 {
    private MaterialService materialService;

    @Autowired
    public MaterialControllerV1(MaterialService materialService) {
        this.materialService = materialService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> addMaterial(@RequestBody MaterialRequestDTO material) {
        materialService.addMaterial(material);
        return new ResponseEntity<>("Material created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Material> getMaterialById(@PathVariable("id") Integer materialId) {
        Material material = materialService.getMaterialById(materialId);
        if (material != null) {
            return new ResponseEntity<>(material, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Material>> getAllMaterials() {
        List<Material> materials = materialService.getAllMaterials();
        return new ResponseEntity<>(materials, HttpStatus.OK);
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<List<Material>> getMaterialsByTitle(@PathVariable String title) {
        List<Material> materials = materialService.getMaterialsByTitle(title);
        if (materials != null && !materials.isEmpty()) {
            return new ResponseEntity<>(materials, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/price-range/{min}/{max}")
    public ResponseEntity<List<Material>> getMaterialsByPriceRange(
            @PathVariable("min") Double minPrice, @PathVariable("max") Double maxPrice) {
        List<Material> materials = materialService.getMaterialsByPriceRange(minPrice, maxPrice);
        if (materials != null && !materials.isEmpty()) {
            return new ResponseEntity<>(materials, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateMaterial(@PathVariable("id") Integer materialId, @RequestBody MaterialRequestDTO material) {
        Material existingMaterial = materialService.getMaterialById(materialId);
        if (existingMaterial != null) {
            materialService.updateMaterial(materialId, material);
            return new ResponseEntity<>("Material updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Material not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMaterial(@PathVariable("id") Integer materialId) {
        Material existingMaterial = materialService.getMaterialById(materialId);
        if (existingMaterial != null) {
            materialService.deleteMaterial(materialId);
            return new ResponseEntity<>("Material deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Material not found", HttpStatus.NOT_FOUND);
        }
    }
}
