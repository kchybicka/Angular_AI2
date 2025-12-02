import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List {
  items: string[] = [];
  newItem: string = '';

  addItem(): void {
    if (this.newItem.trim() !== '') {
      this.items.push(this.newItem);
      this.newItem = '';
    }
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  hasItems(): boolean {
    return this.items.length > 0;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}
