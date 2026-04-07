import { Component } from '@angular/core';
import { Card } from './card/card';
import { ScrollAnimateDirective } from '../../../shared/directives/scroll.directive';

@Component({
  selector: 'app-services-section',
  imports: [Card, ScrollAnimateDirective],
  templateUrl: './services-section.html',
  styleUrl: './services-section.css',
})
export class ServicesSection {

}