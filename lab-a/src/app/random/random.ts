import { Component, Input } from '@angular/core';
import { RandomService } from '../random';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-random',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './random.html',
  styleUrl: './random.css'
})
export class Random {
  @Input() max: number = 100; 
  randomNumber: number = 0;

  constructor(private randomService: RandomService) {}

  generateNumber(): void {
    this.randomNumber = this.randomService.getRandomNumber(this.max);
  }

  isLowNumber(): boolean {
    return this.randomNumber <= 0.5 * this.max;
  }

  getComment(): string {
    if (this.randomNumber === 0) {
      return 'Kliknij przycisk aby wylosować liczbę';
    }
    return this.isLowNumber()
      ? `Liczba ${this.randomNumber} jest mniejsza lub równa ${0.5 * this.max}`
      : `Liczba ${this.randomNumber} jest większa od ${0.5 * this.max}`;
  }
}
