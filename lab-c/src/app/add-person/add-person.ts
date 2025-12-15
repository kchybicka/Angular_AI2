import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Person } from '../person';
import { PersonServiceService } from '../person-service';

@Component({
  selector: 'app-add-person',
  imports: [FormsModule, RouterLink],
  templateUrl: './add-person.html',
  styleUrl: './add-person.css'
})
export class AddPerson {
  person: Person = {
    address: {}
  };

  constructor(
    private personService: PersonServiceService,
    private router: Router
  ) {}

  save(): void {
    this.personService.addPerson(this.person);
    this.router.navigate(['/']);
  }
}
