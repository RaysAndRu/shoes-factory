package org.example.shoesfactory.models.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductTotalRevenueDTO implements Serializable {
    private Integer productId;
    private String productName;
    private Double totalRevenue;
}
