package org.example.shoesfactory.repositories;

import org.example.shoesfactory.models.ProductWarehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductWarehouseRepository extends JpaRepository<ProductWarehouse, Integer> {

    @Procedure(procedureName = "get_product_warehouse_by_product_id")
    List<ProductWarehouse> getProductWarehouseByProductId(@Param("p_product_id") Integer productId);

    @Procedure(procedureName = "add_product_warehouse")
    void addProductWarehouse(@Param("p_product_id") Integer productId,
                             @Param("p_warehouse_id") Integer warehouseId,
                             @Param("p_quantity") Integer quantity);

    @Procedure(procedureName = "get_product_warehouse_by_id")
    Optional<ProductWarehouse>  getProductWarehouseById(@Param("p_product_warehouse_id") Integer productWarehouseId);

    @Procedure(procedureName = "get_all_product_warehouses")
    List<ProductWarehouse> getAllProductWarehouses();

    @Procedure(procedureName = "update_product_warehouse")
    void updateProductWarehouse(@Param("p_product_warehouse_id") Integer productWarehouseId,
                                @Param("p_product_id") Integer productId,
                                @Param("p_warehouse_id") Integer warehouseId,
                                @Param("p_quantity") Integer quantity);

    @Procedure(procedureName = "delete_product_warehouse")
    void deleteProductWarehouse(@Param("p_product_warehouse_id") Integer productWarehouseId);
}
