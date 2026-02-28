import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input({required: true}) link!: string;
  @Input({required: true}) title!: string;
  @Input({required: true}) description!: string;
  @Input({required: true}) image!: {
    src: string,
    alt: string
  };
}
