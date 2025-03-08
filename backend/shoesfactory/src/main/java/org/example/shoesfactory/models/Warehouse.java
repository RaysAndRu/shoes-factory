package org.example.shoesfactory.models;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;



@Entity
@Table(name = "warehouses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Warehouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warehouse_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "responsible_employee_id")
    @JsonProperty("responsibleEmployee")
    private Employee responsibleEmployee;

    private String address;
    private String phone;

    @Column(name = "product_quantity")
    private Integer productQuantity;
}
