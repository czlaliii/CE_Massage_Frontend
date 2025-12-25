import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from "./footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <app-header/>
    <main class="page-content">
      <router-outlet></router-outlet>
    </main>
    <app-footer/>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CE_Massage_Frontend');
}
