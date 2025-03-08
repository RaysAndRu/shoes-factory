package org.example.shoesfactory.models.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientSalesDTO implements Serializable {
    private Integer clientId;
    private String lastName;
    private String firstName;
    private Double totalSpent;
    private Integer clientRank;
}
