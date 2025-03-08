package org.example.shoesfactory.repositories;

import org.example.shoesfactory.models.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Integer> {

    // Процедура для добавления нового склада
    @Procedure(procedureName = "add_warehouse")
    void addWarehouse(
            @Param("p_responsible_employee_id") Integer responsibleEmployeeId,
            @Param("p_address") String address,
            @Param("p_phone") String phone,
            @Param("p_product_quantity") Integer productQuantity
    );

    @Procedure(procedureName = "get_all_warehouses")
    List<Warehouse> getAllWarehouse();

    // Процедура для получения склада по ID
    @Procedure(procedureName = "get_warehouse_by_id")
    Optional<Warehouse>  getWarehouseById(@Param("p_warehouse_id") Integer warehouseId);

    // Процедура для обновления информации о складе
    @Procedure(procedureName = "update_warehouse")
    void updateWarehouse(
            @Param("p_warehouse_id") Integer warehouseId,
            @Param("p_responsible_employee_id") Integer responsibleEmployeeId,
            @Param("p_address") String address,
            @Param("p_phone") String phone,
            @Param("p_product_quantity") Integer productQuantity
    );

    // Процедура для удаления склада
    @Procedure(procedureName = "delete_warehouse")
    void deleteWarehouse(@Param("p_warehouse_id") Integer warehouseId);

    // Процедура для поиска склада по телефону
    @Procedure(procedureName = "get_warehouse_by_phone")
    Optional<Warehouse>  getWarehouseByPhone(@Param("p_phone") String phone);

    @Procedure(procedureName = "analyze_average_product_quantity_per_warehouse")
    List<Object[]> analyzeAverageProductQuantityPerWarehouse();
}
