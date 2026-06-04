import { Component } from '@angular/core';
import { Card } from './card/card';
import { ScrollAnimateDirective } from '../../../shared/directives/scroll.directive';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-services-section',
  imports: [Card, ScrollAnimateDirective, TranslatePipe],
  templateUrl: './services-section.html',
  styleUrl: './services-section.css',
})
export class ServicesSection {

}