import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { Reviews } from './components/reviews/reviews';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule, Reviews],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {

}
