import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatMenuModule, MatButtonModule, NgOptimizedImage],
  templateUrl: './header.html',
  styleUrl: './header.css',
  encapsulation: ViewEncapsulation.None
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

