import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-review',
  imports: [MatCardModule],
  templateUrl: './review.html',
  styleUrl: './review.css',
})

export class Review {
  @Input() reviewText!: string;
  @Input() reviewAuthor!: string;
}
