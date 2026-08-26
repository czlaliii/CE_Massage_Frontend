import { Component } from '@angular/core';
import { Button } from '../../shared/button/button';
import { TranslatePipe } from '@ngx-translate/core';
import { signal } from '@angular/core';

@Component({
  selector: 'app-prices',
  imports: [Button, TranslatePipe],
  templateUrl: './prices.html',
  styleUrl: './prices.css',
})
export class PricesComponent {

  openInfo = signal<
    'five' | 'expanse' | 'vibecodes' | 'swedish' | 'premium' | null
  >(null);

  openTreatment = signal<string | null>(null);

  toggleInfo(
    service: 'five' | 'expanse' | 'vibecodes' | 'swedish' | 'premium'
  ): void {

    if (this.openInfo() === service) {

      this.openInfo.set(null);

    } else {

      this.openInfo.set(service);

    }
  }


  toggleTreatment(
    treatment: string
  ): void {

    if (this.openTreatment() === treatment) {

      this.openTreatment.set(null);

    } else {

      this.openTreatment.set(treatment);

    }

  }
}
