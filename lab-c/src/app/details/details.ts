import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Person } from '../person';
import { PersonServiceService } from '../person-service';

@Component({
  selector: 'app-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {
  person: Person | null = null;
  personId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonServiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.personId = params.get('id');
      if (this.personId !== null) {
        const index = parseInt(this.personId, 10);
        this.person = this.personService.getPersonByIndex(index);
      }
    });
  }
}
