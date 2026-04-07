import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollAnimateDirective } from '../../../shared/directives/scroll.directive';

@Component({
  selector: 'app-about-section',
  imports: [NgOptimizedImage, RouterLink, ScrollAnimateDirective],
  templateUrl: './about-section.html',
  styleUrl: './about-section.css',
})
export class AboutSection {

}
