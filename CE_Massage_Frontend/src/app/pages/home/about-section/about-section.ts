import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ScrollAnimateDirective } from '../../../shared/directives/scroll.directive';
import { Button } from '../../../shared/button/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about-section',
  imports: [NgOptimizedImage, ScrollAnimateDirective, Button, TranslatePipe],
  templateUrl: './about-section.html',
  styleUrl: './about-section.css',
})
export class AboutSection {

}
