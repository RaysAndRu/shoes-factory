package org.example.shoesfactory.models.dto.request;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.shoesfactory.models.Role;

import java.io.Serializable;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO implements Serializable {
    private String roleTitle;
    private String login;
    private String passwordHash;
    private String phone;
    private String email;
    private String registrationDate;
    private String status;
}
