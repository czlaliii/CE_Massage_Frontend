import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../../shared/directives/scroll.directive';
import { TranslatePipe } from '@ngx-translate/core';
import { CookieService } from '../../../services/cookie.service';

@Component({
  selector: 'app-google-maps',
  imports: [ScrollAnimateDirective, TranslatePipe],
  templateUrl: './google-maps.html',
  styleUrl: './google-maps.css',
})
export class GoogleMaps {
  constructor(
      public cookieService: CookieService
  ) {}
}
