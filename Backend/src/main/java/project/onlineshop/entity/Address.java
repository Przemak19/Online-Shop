package project.onlineshop.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue
    private Long Id;

    private String country;
    private String zipcode;
    private String city;
    private String street;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private final LocalDateTime created = LocalDateTime.now();
}
