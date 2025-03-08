package org.example.shoesfactory.repositories;

import org.example.shoesfactory.models.ProductionOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductionOrderRepository extends JpaRepository<ProductionOrder, Integer> {

    // Добавление нового производственного заказа
    @Procedure(procedureName = "add_production_order")
    void addProductionOrder(
            @Param("p_product_id") Integer productId,
            @Param("p_quantity") Integer quantity,
            @Param("p_planned_completion_date") Date plannedCompletionDate,
            @Param("p_status") String status
    );

    // Получение заказа по ID
    @Procedure(procedureName = "get_production_order_by_id")
    Optional<ProductionOrder>  getProductionOrderById(@Param("p_production_order_id") Integer productionOrderId);

    // Получение всех заказов
    @Procedure(procedureName = "get_all_production_orders")
    List<ProductionOrder> getAllProductionOrders();



    // Обновление информации о заказе
    @Procedure(procedureName = "update_production_order")
    void updateProductionOrder(
            @Param("p_production_order_id") Integer productionOrderId,
            @Param("p_product_id") Integer productId,
            @Param("p_quantity") Integer quantity,
            @Param("p_planned_completion_date") Date plannedCompletionDate,
            @Param("p_actual_completion_date") Date actualCompletionDate,
            @Param("p_status") String status
    );

    // Удаление заказа
    @Procedure(procedureName = "delete_production_order")
    void deleteProductionOrder(@Param("p_production_order_id") Integer productionOrderId);

    // Получение заказов по статусу
    @Procedure(procedureName = "get_production_orders_by_status")
    List<ProductionOrder> getProductionOrdersByStatus(@Param("p_status") String status);
}
