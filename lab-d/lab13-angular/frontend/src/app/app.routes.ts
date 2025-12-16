import { Routes } from '@angular/router';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonFormComponent } from './components/person-form/person-form';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: PersonListComponent },
  { path: 'add', component: PersonFormComponent },
  { path: 'edit/:id', component: PersonFormComponent }
];
