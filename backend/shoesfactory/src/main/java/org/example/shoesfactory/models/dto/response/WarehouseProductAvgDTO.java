package org.example.shoesfactory.models.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WarehouseProductAvgDTO  implements Serializable {
    private Integer warehouseId;
    private String address;
    private Double averagePrice;
}
