package org.example.shoesfactory.services.interfaces;

import org.example.shoesfactory.models.Employee;
import org.example.shoesfactory.models.dto.request.EmployeeRequestDTO;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@PreAuthorize("hasRole('ROLE_ADMIN')")
public interface EmployeeService {
    void addEmployee(EmployeeRequestDTO employee);
    Employee getEmployeeById(Integer employeeId);
    List<Employee> getAllEmployees();
    List<Employee> getEmployeesByLastName(String lastName);
    List<Employee> getEmployeesByStatus(String status);
    void updateEmployee(Integer id, EmployeeRequestDTO employee);
    void deleteEmployee(Integer employeeId);
}
