package org.example.shoesfactory.models.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class WarehouseRequestDTO implements Serializable {
    private Integer responsibleEmployeeId;
    private String address;
    private String phone;
    private Integer productQuantity;
}
