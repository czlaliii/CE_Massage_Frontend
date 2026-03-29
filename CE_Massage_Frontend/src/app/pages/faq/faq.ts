import { Component } from '@angular/core';
import { ExpansionComponent } from './components/expansion/expansion';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-faq',
  imports: [ExpansionComponent, MatButtonModule, RouterLink],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class FaqComponent {

}
