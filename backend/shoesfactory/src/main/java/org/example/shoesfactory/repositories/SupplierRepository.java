package org.example.shoesfactory.repositories;

import org.example.shoesfactory.models.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Integer> {

    // Процедура для добавления нового поставщика
    @Procedure(procedureName = "add_supplier")
    void addSupplier(
            @Param("p_title") String title,
            @Param("p_contact_details") String contactDetails,
            @Param("p_address") String address,
            @Param("p_phone") String phone,
            @Param("p_email") String email,
            @Param("p_tin") String tin
    );

    // Процедура для получения поставщика по ID
    @Procedure(procedureName = "get_supplier_by_id")
    Optional<Supplier>  getSupplierById(@Param("p_supplier_id") Integer supplierId);

    // Процедура для получения всех поставщиков
    @Procedure(procedureName = "get_all_suppliers")
    List<Supplier> getAllSuppliers();

    // Процедура для поиска поставщиков по названию
    @Procedure(procedureName = "get_suppliers_by_title")
    List<Supplier> getSuppliersByTitle(@Param("p_title") String title);

    // Процедура для обновления информации о поставщике
    @Procedure(procedureName = "update_supplier")
    void updateSupplier(
            @Param("p_supplier_id") Integer supplierId,
            @Param("p_title") String title,
            @Param("p_contact_details") String contactDetails,
            @Param("p_address") String address,
            @Param("p_phone") String phone,
            @Param("p_email") String email,
            @Param("p_tin") String tin
    );

    // Процедура для удаления поставщика
    @Procedure(procedureName = "delete_supplier")
    void deleteSupplier(@Param("p_supplier_id") Integer supplierId);
}
