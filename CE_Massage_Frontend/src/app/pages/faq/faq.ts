import { Component } from '@angular/core';
import { ExpansionComponent } from './components/expansion/expansion';
import { MatButtonModule } from '@angular/material/button';
import { Button } from "../../shared/button/button";

@Component({
  selector: 'app-faq',
  imports: [ExpansionComponent, MatButtonModule, Button],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class FaqComponent {

}
