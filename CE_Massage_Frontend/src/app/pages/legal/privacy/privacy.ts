import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy',
  imports: [TranslatePipe],
  templateUrl: './privacy.html',
  styleUrl: '../legal.css',
})
export class Privacy {

}
