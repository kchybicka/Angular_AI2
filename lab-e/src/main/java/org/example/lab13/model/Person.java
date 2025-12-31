package org.example.lab13.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "persons")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name is required")
    @Column(name = "first_name")  // ← DODAJ TO
    private String firstName;

    @NotBlank(message = "Family name is required")
    @Column(name = "family_name")  // ← DODAJ TO
    private String familyName;

    @Min(value = 0, message = "Age must be positive")
    private Integer age;

    @Embedded
    private Address address;

    public Person() {
    }

    public Person(Long id, String firstName, String familyName, Integer age, Address address) {
        this.id = id;
        this.firstName = firstName;
        this.familyName = familyName;
        this.age = age;
        this.address = address;
    }

    // Gettery i settery (bez zmian)
    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getFamilyName() {
        return familyName;
    }

    public Integer getAge() {
        return age;
    }

    public Address getAddress() {
        return address;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}
