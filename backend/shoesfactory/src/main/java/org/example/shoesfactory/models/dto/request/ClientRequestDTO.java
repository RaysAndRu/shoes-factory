package org.example.shoesfactory.models.dto.request;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientRequestDTO implements Serializable {
    private String lastName;
    private String firstName;
    private String middleName;
    private String formOrganization;
    private String contactDetails;
    private String email;
    private String phone;
    private Date registrationDate;
    private String type ;
}
