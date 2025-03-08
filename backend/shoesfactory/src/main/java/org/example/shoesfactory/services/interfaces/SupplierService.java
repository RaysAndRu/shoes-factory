package org.example.shoesfactory.services.interfaces;

import org.example.shoesfactory.models.Supplier;
import org.example.shoesfactory.models.dto.request.SupplierRequestDTO;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

public interface SupplierService {
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    void addSupplier(SupplierRequestDTO supplier);

    @PreAuthorize("hasRole('ROLE_READER')")
    Supplier getSupplierById(Integer supplierId);

    @PreAuthorize("hasRole('ROLE_READER')")
    List<Supplier> getAllSuppliers();

    @PreAuthorize("hasRole('ROLE_READER')")
    List<Supplier> getSuppliersByTitle(String title);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    void updateSupplier(Integer id, SupplierRequestDTO supplier);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    void deleteSupplier(Integer supplierId);
}

