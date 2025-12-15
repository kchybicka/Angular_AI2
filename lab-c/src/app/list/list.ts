import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Person } from '../person';
import { PersonServiceService } from '../person-service';

@Component({
  selector: 'app-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List implements OnInit {
  persons: Person[] = [];

  constructor(private personService: PersonServiceService) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.persons = this.personService.getAllPersons();
  }

  delete(index: number): void {
    if (confirm('Czy na pewno chcesz usunąć tę osobę?')) {
      this.personService.deletePerson(index);
      this.loadPersons(); // Odświeżenie listy po usunięciu
    }
  }
}
