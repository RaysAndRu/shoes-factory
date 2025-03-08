package org.example.shoesfactory.models;



import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "suppliers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplier_id")
    private Integer id;

    private String title;
    @Column(name = "contact_details")
    private String contactDetails;

    private String address;

    private String phone;

    private String email;

    private String tin;
}
