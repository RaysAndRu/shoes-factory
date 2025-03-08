package org.example.shoesfactory.controllers;

import lombok.RequiredArgsConstructor;
import org.example.shoesfactory.models.Employee;
import org.example.shoesfactory.models.dto.request.EmployeeRequestDTO;
import org.example.shoesfactory.services.interfaces.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
public class EmployeeControllerV1 {
    private EmployeeService employeeService;

    @Autowired
    public EmployeeControllerV1(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> addEmployee(@RequestBody EmployeeRequestDTO employee) {
        System.out.println(employee);
        employeeService.addEmployee(employee);
        return new ResponseEntity<>("Employee created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") Integer employeeId) {
        Employee employee = employeeService.getEmployeeById(employeeId);
        if (employee != null) {
            return new ResponseEntity<>(employee, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/lastname/{lastname}")
    public ResponseEntity<List<Employee>> getEmployeesByLastName(@PathVariable("lastname") String lastName) {
        List<Employee> employees = employeeService.getEmployeesByLastName(lastName);
        if (employees != null && !employees.isEmpty()) {
            return new ResponseEntity<>(employees, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Employee>> getEmployeesByStatus(@PathVariable("status") String status) {
        List<Employee> employees = employeeService.getEmployeesByStatus(status);
        return employees.isEmpty()? new ResponseEntity<>(HttpStatus.NOT_FOUND) : new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateEmployee(@PathVariable("id") Integer employeeId, @RequestBody EmployeeRequestDTO employee) {
        Employee existingEmployee = employeeService.getEmployeeById(employeeId);
        if (existingEmployee != null) {
            employeeService.updateEmployee(employeeId, employee);
            return new ResponseEntity<>("Employee updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Employee not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Integer employeeId) {
        Employee existingEmployee = employeeService.getEmployeeById(employeeId);
        if (existingEmployee != null) {
            employeeService.deleteEmployee(employeeId);
            return new ResponseEntity<>("Employee deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Employee not found", HttpStatus.NOT_FOUND);
        }
    }
}
