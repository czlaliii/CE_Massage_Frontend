import { Component } from '@angular/core';
import { ExpansionComponent } from './components/expansion/expansion';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-faq',
  imports: [ExpansionComponent, MatButtonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class FaqComponent {

}
