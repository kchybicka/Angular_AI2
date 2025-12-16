import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  // UWAGA: Port 53725!
  private apiUrl = 'http://localhost:53725/api/persons';

  constructor(private http: HttpClient) { }

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getPersonById(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person)
      .pipe(catchError(this.handleError));
  }

  updatePerson(id: number, person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiUrl}/${id}`, person)
      .pipe(catchError(this.handleError));
  }

  deletePerson(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Wystąpił błąd!';
    if (error.status === 404) {
      errorMessage = 'Nie znaleziono zasobu';
    } else if (error.status === 500) {
      errorMessage = 'Błąd serwera';
    }
    console.error(errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
