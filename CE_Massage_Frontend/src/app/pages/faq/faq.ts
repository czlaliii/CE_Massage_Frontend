import { Component } from '@angular/core';
import { ExpansionComponent } from './components/expansion/expansion';
import { MatButtonModule } from '@angular/material/button';
import { Button } from "../../shared/button/button";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-faq',
  imports: [ExpansionComponent, MatButtonModule, Button, TranslatePipe],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class FaqComponent {

}
