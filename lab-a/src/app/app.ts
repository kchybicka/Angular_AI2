import { Component } from '@angular/core';
import { Random } from './random/random';
import { List } from './list/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Random, List],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'lab11';
  mojeWlasciwosc: string = 'Aplikacje internetowe 2';
}
