package org.example.shoesfactory.models.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductionOrderRequestDTO implements Serializable {
    private Integer productId;
    private Integer quantity;
    private Date orderDate;
    private Date plannedCompletionDate;
    private Date actualCompletionDate;
    private String status ;
}
