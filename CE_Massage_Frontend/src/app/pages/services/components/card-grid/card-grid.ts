import { Component, Input } from '@angular/core';
import { Card } from "../card/card";

@Component({
  selector: 'app-card-grid',
  imports: [Card],
  templateUrl: './card-grid.html',
  styleUrl: './card-grid.css',
})
export class CardGrid {
  @Input() cards: { title: string; description: string }[] = [];
}
