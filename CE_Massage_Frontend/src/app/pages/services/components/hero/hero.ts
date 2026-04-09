import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  @Input({ required: true }) imageUrl!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) width!: number;
  @Input({ required: true }) height!: number;
}
