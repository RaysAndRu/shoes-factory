package org.example.shoesfactory.repositories;

import org.example.shoesfactory.models.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Integer> {

    // Процедура для добавления нового материала
    @Procedure(procedureName = "add_material")
    void addMaterial(
            @Param("p_supplier_id") Integer supplierId,
            @Param("p_title") String title,
            @Param("p_price") Double price,
            @Param("p_quantity") Integer quantity,
            @Param("p_unit_of_measure") String unitOfMeasure,
            @Param("p_supply_date") String supplyDate
    );

    // Процедура для получения материала по ID
    @Procedure(procedureName = "get_material_by_id")
    Optional<Material>  getMaterialById(@Param("p_material_id") Integer materialId);

    // Процедура для получения всех материалов
    @Procedure(procedureName = "get_all_materials")
    List<Material> getAllMaterials();

    // Процедура для поиска материалов по названию
    @Procedure(procedureName = "get_materials_by_title")
    List<Material> getMaterialsByTitle(@Param("p_title") String title);

    // Процедура для фильтрации материалов по цене
    @Procedure(procedureName = "get_materials_by_price_range")
    List<Material> getMaterialsByPriceRange(
            @Param("p_min_price") Double minPrice,
            @Param("p_max_price") Double maxPrice
    );

    // Процедура для обновления информации о материале
    @Procedure(procedureName = "update_material")
    void updateMaterial(
            @Param("p_material_id") Integer materialId,
            @Param("p_supplier_id") Integer supplierId,
            @Param("p_title") String title,
            @Param("p_price") Double price,
            @Param("p_quantity") Integer quantity,
            @Param("p_unit_of_measure") String unitOfMeasure,
            @Param("p_supply_date") String supplyDate
    );

    // Процедура для удаления материала
    @Procedure(procedureName = "delete_material")
    void deleteMaterial(@Param("p_material_id") Integer materialId);
}
