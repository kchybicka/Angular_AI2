package org.example.lab13.controller;

import org.example.lab13.model.Person;
import org.example.lab13.repository.PersonRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/persons")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:53725"})
public class PersonController {

    @Autowired
    private PersonRepository personRepository;

    @GetMapping
    public ResponseEntity<List<Person>> getAllPersons() {
        List<Person> persons = personRepository.findAll();
        return ResponseEntity.ok(persons);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable Long id) {
        Optional<Person> person = personRepository.findById(id);
        return person.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Person> createPerson(@Valid @RequestBody Person person) {
        try {
            Person savedPerson = personRepository.save(person);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPerson);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Person> updatePerson(@PathVariable Long id,
                                               @Valid @RequestBody Person personDetails) {
        Optional<Person> personOptional = personRepository.findById(id);

        if (personOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Person person = personOptional.get();
        person.setFirstName(personDetails.getFirstName());
        person.setFamilyName(personDetails.getFamilyName());
        person.setAge(personDetails.getAge());
        person.setAddress(personDetails.getAddress());

        try {
            Person updatedPerson = personRepository.save(person);
            return ResponseEntity.ok(updatedPerson);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePerson(@PathVariable Long id) {
        if (!personRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        try {
            personRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}