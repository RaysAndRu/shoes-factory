package org.example.shoesfactory.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.shoesfactory.models.Employee;
import org.example.shoesfactory.models.dto.request.EmployeeRequestDTO;
import org.example.shoesfactory.repositories.EmployeeRepository;
import org.example.shoesfactory.services.interfaces.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void addEmployee(EmployeeRequestDTO employee) {
        employeeRepository.addEmployee(
                employee.getLastName(),
                employee.getFirstName(),
                employee.getMiddleName(),
                employee.getDateOfBirth(),
                employee.getPhone(),
                employee.getEmail(),
                employee.getHireDate(),
                employee.getDismissalDate(),
                employee.getPassportSeries(),
                employee.getPassportNumber(),
                employee.getPosition(),
                employee.getStatus()
        );
    }

    @Override
    @Transactional
    public Employee getEmployeeById(Integer employeeId) {
        return employeeRepository.getEmployeeById(employeeId)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with id: " + employeeId));
    }

    @Override
    @Transactional
    public List<Employee> getAllEmployees() {
        return employeeRepository.getAllEmployees();
    }

    @Override
    @Transactional
    public List<Employee> getEmployeesByLastName(String lastName) {
        return employeeRepository.getEmployeesByLastName(lastName);
    }

    @Override
    @Transactional
    public List<Employee> getEmployeesByStatus(String status) {
        return employeeRepository.getEmployeesByStatus(status);
    }

    @Override
    public void updateEmployee(Integer id, EmployeeRequestDTO employee) {
        employeeRepository.updateEmployee(
                id,
                employee.getLastName(),
                employee.getFirstName(),
                employee.getMiddleName(),
                employee.getDateOfBirth(),
                employee.getPhone(),
                employee.getEmail(),
                employee.getHireDate(),
                employee.getDismissalDate(),
                employee.getPassportSeries(),
                employee.getPassportNumber(),
                employee.getPosition(),
                employee.getStatus()
        );
    }

    @Override
    public void deleteEmployee(Integer employeeId) {
        employeeRepository.deleteEmployee(employeeId);
    }
}
