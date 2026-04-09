import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Hero } from '../components/hero/hero';

@Component({
  selector: 'app-five-continents',
  imports: [NgOptimizedImage, Hero],
  templateUrl: './five-continents.html',
  styleUrl: './five-continents.css',
})
export class FiveContinentsComponent {

}
