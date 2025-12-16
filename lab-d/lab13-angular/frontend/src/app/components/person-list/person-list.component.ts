import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = false;
    this.loadPersons();
  }

  loadPersons(): void {
    this.loading = true;
    this.errorMessage = '';

    this.personService.getAllPersons().subscribe({
      next: (data: Person[]) => {
        this.persons = data;
        this.loading = false;
        console.log('Pobrano osoby:', data);
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.loading = false;
        console.error('Błąd pobierania:', error);
      }
    });
  }

  deletePerson(id: number | undefined): void {
    if (id && confirm('Czy na pewno chcesz usunąć?')) {
      this.personService.deletePerson(id).subscribe({
        next: () => {
          console.log('Usunięto osobę');
          this.loadPersons();
        },
        error: (error: Error) => this.errorMessage = error.message
      });
    }
  }

  navigateToAdd(): void {
    this.router.navigate(['/add']);
  }

  navigateToEdit(id: number | undefined): void {
    if (id) this.router.navigate(['/edit', id]);
  }
}
