import { Component } from '@angular/core';
import { Button } from '../../shared/button/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-prices',
  imports: [Button, TranslatePipe],
  templateUrl: './prices.html',
  styleUrl: './prices.css',
})
export class PricesComponent {

}
