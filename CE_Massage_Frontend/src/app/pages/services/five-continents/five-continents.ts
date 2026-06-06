import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Hero } from '../components/hero/hero';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-five-continents',
  imports: [NgOptimizedImage, Hero, TranslatePipe],
  templateUrl: './five-continents.html',
  styleUrl: './five-continents.css',
})
export class FiveContinentsComponent {

}
