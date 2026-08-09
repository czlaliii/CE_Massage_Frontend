import { Component, inject } from '@angular/core';
import { CookieService } from '../../services/cookie.service';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cookie-banner',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './cookie-banner.html',
  styleUrl: './cookie-banner.css',
})
export class CookieBanner {

  cookieService = inject(CookieService);

}
