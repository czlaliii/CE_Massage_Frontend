import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-reviews',
  imports: [MatCardModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class Reviews {
  @Input() reviewText!: string;
  @Input() reviewAuthor!: string;
}
