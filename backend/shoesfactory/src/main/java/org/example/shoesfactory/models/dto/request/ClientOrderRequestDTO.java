package org.example.shoesfactory.models.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientOrderRequestDTO implements Serializable {
    private Integer clientId;
    private Integer productId;
    private Integer quantity;
    private Date orderDate;
    private Date expectedDeliveryDate;
    private String deliveryAddress;
    private String paymentMethod;
    private String status;
}
