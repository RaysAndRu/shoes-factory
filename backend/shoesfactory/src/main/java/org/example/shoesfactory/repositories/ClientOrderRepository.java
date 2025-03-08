package org.example.shoesfactory.repositories;

import org.example.shoesfactory.models.ClientOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClientOrderRepository extends JpaRepository<ClientOrder, Integer> {

    // Добавление заказа
    @Procedure(procedureName = "add_client_order")
    void addClientOrder(
            @Param("p_client_id") Integer clientId,
            @Param("p_product_id") Integer productId,
            @Param("p_quantity") Integer quantity,
            @Param("p_expected_delivery_date") Date expectedDeliveryDate,
            @Param("p_delivery_address") String deliveryAddress,
            @Param("p_payment_method") String paymentMethod,
            @Param("p_status") String status
    );

    // Получение заказа по ID
    @Procedure(procedureName = "get_client_order_by_id")
    Optional<ClientOrder>  getClientOrderById(@Param("p_client_order_id") Integer clientOrderId);

    // Получение всех заказов
    @Procedure(procedureName = "get_all_client_orders")
    List<ClientOrder> getAllClientOrders();

    @Procedure(procedureName = "get_clients_orders_by_status")
    List<ClientOrder> getClientOrdersByStatus(@Param("p_status") String status);

    @Procedure(procedureName = "get_clients_orders_by_payment_method")
    List<ClientOrder> getClientOrdersByPaymentMethod(@Param("p_payment_method") String paymentMethod);
    // Обновление заказа
    @Procedure(procedureName = "update_client_order")
    void updateClientOrder(
            @Param("p_client_order_id") Integer clientOrderId,
            @Param("p_client_id") Integer clientId,
            @Param("p_product_id") Integer productId,
            @Param("p_quantity") Integer quantity,
            @Param("p_expected_delivery_date") Date expectedDeliveryDate,
            @Param("p_delivery_address") String deliveryAddress,
            @Param("p_payment_method") String paymentMethod,
            @Param("p_status") String status
    );

    // Удаление заказа
    @Procedure(procedureName = "delete_client_order")
    void deleteClientOrder(@Param("p_client_order_id") Integer clientOrderId);

    // Получение заказов по клиенту
    @Procedure(procedureName = "get_client_orders_by_client_id")
    List<ClientOrder> getClientOrdersByClientId(@Param("p_client_id") Integer clientId);

    // Получение заказов по продукту
    @Procedure(procedureName = "get_client_orders_by_product_id")
    List<ClientOrder> getClientOrdersByProductId(@Param("p_product_id") Integer productId);
}
