package com.pharmasync.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private long id;

    private String username;

    private String password;

    private String role; //USer ADMIN, etc

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Prescription> prescriptions;
}
