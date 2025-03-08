package org.example.shoesfactory.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.shoesfactory.models.Material;
import org.example.shoesfactory.models.dto.request.MaterialRequestDTO;
import org.example.shoesfactory.repositories.MaterialRepository;
import org.example.shoesfactory.services.interfaces.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MaterialServiceImpl implements MaterialService {
    private final MaterialRepository materialRepository;

    @Autowired
    public MaterialServiceImpl(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    @Override
    public void addMaterial(MaterialRequestDTO material) {
        materialRepository.addMaterial(
                material.getSupplierId(),
                material.getTitle(),
                material.getPrice(),
                material.getQuantity(),
                material.getUnitOfMeasure(),
                material.getSupplyDate()
        );
    }

    @Override
    @Transactional
    public Material getMaterialById(Integer materialId) throws EntityNotFoundException {
        return materialRepository.getMaterialById(materialId)
                .orElseThrow(() -> new EntityNotFoundException("Material with id " + materialId + " not found"));
    }

    @Override
    @Transactional
    public List<Material> getAllMaterials() {
        return materialRepository.getAllMaterials();
    }

    @Override
    @Transactional
    public List<Material> getMaterialsByTitle(String title) {
        return materialRepository.getMaterialsByTitle(title);
    }

    @Override
    @Transactional
    public List<Material> getMaterialsByPriceRange(Double minPrice, Double maxPrice) {
        return materialRepository.getMaterialsByPriceRange(minPrice, maxPrice);
    }

    @Override
    public void updateMaterial(Integer id,MaterialRequestDTO material) throws EntityNotFoundException {
        materialRepository.updateMaterial(
                id,
                material.getSupplierId(),
                material.getTitle(),
                material.getPrice(),
                material.getQuantity(),
                material.getUnitOfMeasure(),
                material.getSupplyDate()
        );
    }

    @Override
    @Transactional
    public void deleteMaterial(Integer materialId) throws EntityNotFoundException {
        try {
            materialRepository.getMaterialById(materialId)
                    .orElseThrow(() -> new EntityNotFoundException("Material with id " + materialId + " not found"));
            materialRepository.deleteMaterial(materialId);
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException("Material with id " + materialId + " not found");
        }
    }
}
