package org.example.shoesfactory.models;



import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    private String login;

    @Column(name = "password_hash")
    private String passwordHash;

    private String phone;

    private String email;

    @Column(name = "registration_date")
    private String registrationDate;

    @Column(name = "status")
    private String status;
}
