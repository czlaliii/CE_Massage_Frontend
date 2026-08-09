import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CookieService } from '../../../services/cookie.service';

@Component({
  selector: 'app-cookies',
  imports: [TranslatePipe],
  templateUrl: './cookies.html',
  styleUrl: '../legal.css',
})
export class Cookies {
  constructor(
    public cookieService:CookieService
  ) {}
}
