import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person-form.html',
  styleUrls: ['./person-form.css']
})
export class PersonFormComponent implements OnInit {
  personForm: FormGroup;
  isEditMode = false;
  personId?: number;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.personForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      familyName: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.min(0), Validators.max(150)]],
      address: this.fb.group({
        city: ['', Validators.required],
        street: ['', Validators.required],
        postCode: ['', [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)]]
      })
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.personId = +id;
      this.isEditMode = true;
      this.loadPerson(this.personId);
    }
  }

  loadPerson(id: number): void {
    this.personService.getPersonById(id).subscribe({
      next: (person: Person) => this.personForm.patchValue(person),
      error: (error: Error) => this.errorMessage = error.message
    });
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      const person: Person = this.personForm.value;

      if (this.isEditMode && this.personId) {
        this.personService.updatePerson(this.personId, person).subscribe({
          next: () => {
            this.successMessage = 'Zaktualizowano!';
            setTimeout(() => this.router.navigate(['/list']), 1500);
          },
          error: (error: Error) => this.errorMessage = error.message
        });
      } else {
        this.personService.createPerson(person).subscribe({
          next: () => {
            this.successMessage = 'Dodano!';
            setTimeout(() => this.router.navigate(['/list']), 1500);
          },
          error: (error: Error) => this.errorMessage = error.message
        });
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/list']);
  }

  get firstName() { return this.personForm.get('firstName'); }
  get familyName() { return this.personForm.get('familyName'); }
  get age() { return this.personForm.get('age'); }
  get city() { return this.personForm.get('address.city'); }
  get street() { return this.personForm.get('address.street'); }
  get postCode() { return this.personForm.get('address.postCode'); }
}
