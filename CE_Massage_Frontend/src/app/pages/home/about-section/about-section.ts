import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ScrollAnimateDirective } from '../../../shared/directives/scroll.directive';
import { Button } from '../../../shared/button/button';

@Component({
  selector: 'app-about-section',
  imports: [NgOptimizedImage, ScrollAnimateDirective, Button],
  templateUrl: './about-section.html',
  styleUrl: './about-section.css',
})
export class AboutSection {

}
