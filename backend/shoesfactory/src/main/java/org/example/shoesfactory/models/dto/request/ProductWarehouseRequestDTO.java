package org.example.shoesfactory.models.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductWarehouseRequestDTO implements Serializable {
    private Integer warehouseId;
    private Integer productId;
    private Integer quantity;
}
