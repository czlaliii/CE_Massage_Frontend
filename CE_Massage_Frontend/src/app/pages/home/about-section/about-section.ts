import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-section',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './about-section.html',
  styleUrl: './about-section.css',
})
export class AboutSection {

}
