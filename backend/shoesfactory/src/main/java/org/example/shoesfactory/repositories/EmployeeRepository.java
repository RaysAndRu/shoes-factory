package org.example.shoesfactory.repositories;

import org.example.shoesfactory.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    @Procedure(procedureName = "add_employee")
    void addEmployee(
            @Param("p_last_name") String lastName,
            @Param("p_first_name") String firstName,
            @Param("p_middle_name") String middleName,
            @Param("p_date_of_birth") String dateOfBirth,
            @Param("p_phone") String phone,
            @Param("p_email") String email,
            @Param("p_hire_date") String hireDate,
            @Param("p_dismissal_date") String dismissalDate,
            @Param("p_passport_series") String passportSeries,
            @Param("p_passport_number") String passportNumber,
            @Param("p_position") String position,
            @Param("p_status") String status
    );


    @Procedure(procedureName = "get_employee_by_id")
    Optional<Employee>  getEmployeeById(@Param("p_employee_id") Integer employeeId);


    @Procedure(procedureName = "get_all_employees")
    List<Employee> getAllEmployees();

    @Procedure(procedureName = "get_employees_by_status")
    List<Employee> getEmployeesByStatus(@Param("p_status") String status);


    @Procedure(procedureName = "update_employee")
    void updateEmployee(
            @Param("p_employee_id") Integer employeeId,
            @Param("p_last_name") String lastName,
            @Param("p_first_name") String firstName,
            @Param("p_middle_name") String middleName,
            @Param("p_date_of_birth") String dateOfBirth,
            @Param("p_phone") String phone,
            @Param("p_email") String email,
            @Param("p_hire_date") String hireDate,
            @Param("p_dismissal_date") String dismissalDate,
            @Param("p_passport_series") String passportSeries,
            @Param("p_passport_number") String passportNumber,
            @Param("p_position") String position,
            @Param("p_status") String status
    );


    @Procedure(procedureName = "delete_employee")
    void deleteEmployee(@Param("p_employee_id") Integer employeeId);


    @Procedure(procedureName = "get_employees_by_last_name")
    List<Employee> getEmployeesByLastName(@Param("p_last_name") String lastName);
}
