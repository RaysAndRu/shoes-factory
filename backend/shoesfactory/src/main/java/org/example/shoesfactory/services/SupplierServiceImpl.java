package org.example.shoesfactory.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.shoesfactory.models.Supplier;
import org.example.shoesfactory.models.dto.request.SupplierRequestDTO;
import org.example.shoesfactory.repositories.SupplierRepository;
import org.example.shoesfactory.services.interfaces.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {
    private final SupplierRepository supplierRepository;

    @Autowired
    public SupplierServiceImpl(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @Override
    public void addSupplier(SupplierRequestDTO supplier) {
        supplierRepository.addSupplier(
                supplier.getTitle(),
                supplier.getContactDetails(),
                supplier.getAddress(),
                supplier.getPhone(),
                supplier.getEmail(),
                supplier.getTin()
        );
    }

    @Override
    @Transactional
    public Supplier getSupplierById(Integer supplierId) {
        return supplierRepository.getSupplierById(supplierId)
                .orElseThrow(() -> new EntityNotFoundException("Supplier not found with id: " + supplierId));
    }

    @Override
    @Transactional
    public List<Supplier> getAllSuppliers() {
        return supplierRepository.getAllSuppliers();
    }

    @Override
    @Transactional
    public List<Supplier> getSuppliersByTitle(String title) {
        return supplierRepository.getSuppliersByTitle(title);
    }

    @Override
    public void updateSupplier(Integer id, SupplierRequestDTO supplier) {
        supplierRepository.updateSupplier(
                id,
                supplier.getTitle(),
                supplier.getContactDetails(),
                supplier.getAddress(),
                supplier.getPhone(),
                supplier.getEmail(),
                supplier.getTin()
        );
    }

    @Override
    public void deleteSupplier(Integer supplierId) {
        supplierRepository.deleteSupplier(supplierId);
    }
}
