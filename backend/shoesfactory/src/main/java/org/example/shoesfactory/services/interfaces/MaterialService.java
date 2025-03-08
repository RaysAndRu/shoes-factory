package org.example.shoesfactory.services.interfaces;

import org.example.shoesfactory.models.Material;
import org.example.shoesfactory.models.dto.request.MaterialRequestDTO;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

public interface MaterialService {
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    void addMaterial(MaterialRequestDTO material);

    @PreAuthorize("hasRole('ROLE_READER')")
    Material getMaterialById(Integer materialId);

    @PreAuthorize("hasRole('ROLE_READER')")
    List<Material> getAllMaterials();

    @PreAuthorize("hasRole('ROLE_READER')")
    List<Material> getMaterialsByTitle(String title);

    @PreAuthorize("hasRole('ROLE_READER')")
    List<Material> getMaterialsByPriceRange(Double minPrice, Double maxPrice);

    @PreAuthorize("hasRole('ROLE_MANAGER')")
    void updateMaterial(Integer id, MaterialRequestDTO material) ;

    @PreAuthorize("hasRole('ROLE_MANAGER')")
    void deleteMaterial(Integer materialId) ;
}
