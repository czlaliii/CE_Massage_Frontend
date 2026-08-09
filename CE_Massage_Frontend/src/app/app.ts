import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from "./footer/footer";
import { CookieBanner } from './shared/cookie-banner/cookie-banner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CookieBanner],
  template: `
    <app-header/>
    <main class="page-content"
    [class.home]="router.url === '/'">
      <router-outlet></router-outlet>
    </main>
    <app-footer/>
    <app-cookie-banner />
  `,
  styleUrl: './app.css'
})
export class App {
  constructor(public router: Router) {}
  protected readonly title = signal('CE_Massage_Frontend');
}
