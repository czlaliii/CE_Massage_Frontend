import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  menuOpen = false;
  servicesOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (!this.menuOpen) {
      this.servicesOpen = false;
    }
  }

  toggleServices(event: Event) {
    event.stopPropagation();
    this.servicesOpen = !this.servicesOpen;
  }

  closeMenu() {
    this.menuOpen = false;
    this.servicesOpen = false;
  }
}

