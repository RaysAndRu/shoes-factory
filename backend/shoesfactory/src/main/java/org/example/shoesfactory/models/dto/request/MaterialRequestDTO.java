package org.example.shoesfactory.models.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaterialRequestDTO implements Serializable {
    private Integer supplierId;
    private String title;
    private Double price;
    private  Integer quantity;
    private String unitOfMeasure;
    private String supplyDate;
}
