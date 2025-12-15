import { Injectable } from '@angular/core';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonServiceService {
  private readonly STORAGE_KEY = 'persons';

  constructor() { }

  getAllPersons(): Person[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  getPersonByIndex(index: number): Person | null {
    const persons = this.getAllPersons();
    return persons[index] || null;
  }

  addPerson(person: Person): void {
    const persons = this.getAllPersons();
    persons.push(person);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(persons));
  }

  deletePerson(index: number): void {
    const persons = this.getAllPersons();
    if (index >= 0 && index < persons.length) {
      persons.splice(index, 1);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(persons));
    }
  }
}
