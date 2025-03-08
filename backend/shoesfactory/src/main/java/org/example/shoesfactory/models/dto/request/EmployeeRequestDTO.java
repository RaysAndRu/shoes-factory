package org.example.shoesfactory.models.dto.request;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeRequestDTO implements Serializable {
    private String lastName;
    private String firstName;
    private String middleName;
    private String dateOfBirth;
    private String phone;
    private String email;
    private String hireDate;
    private String dismissalDate;
    private String passportSeries;
    private String passportNumber;
    private String position;
    private String status;
}
