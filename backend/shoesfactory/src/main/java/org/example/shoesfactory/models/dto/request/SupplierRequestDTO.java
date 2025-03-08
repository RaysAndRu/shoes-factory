package org.example.shoesfactory.models.dto.request;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierRequestDTO implements Serializable {
    private String title;
    private String contactDetails;
    private String address;
    private String phone;
    private String email;
    private String tin;
}
