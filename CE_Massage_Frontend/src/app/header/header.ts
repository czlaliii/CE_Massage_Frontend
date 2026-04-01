import { Component, HostListener, ElementRef, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './header.html',
  styleUrl: './header.css',
  encapsulation: ViewEncapsulation.None
})
export class Header {
  menuOpen = false;
  serviceOpen = false;

  constructor(private eRef: ElementRef) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (!this.menuOpen) {
      this.serviceOpen = false;
    }
  }

  closeMenu() {
    this.menuOpen = false;
    this.serviceOpen = false;
  }

  toggleServices() {
    if (window.innerWidth <= 1024) {
      this.serviceOpen = !this.serviceOpen;
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.menuOpen = false;
      this.serviceOpen = false;
    }
  }
}

