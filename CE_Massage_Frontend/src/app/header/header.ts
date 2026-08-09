import {
  Component,
  HostListener,
  ElementRef,
  ViewEncapsulation
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { HostBinding } from '@angular/core';
import { LanguageService } from '../services/Language.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    TranslatePipe
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
  encapsulation: ViewEncapsulation.None
})
export class Header {

  isScrolled = false;
  menuOpen = false;
  serviceOpen = false;

  @HostListener('window:scroll')
    onScroll() {

      this.isScrolled = window.scrollY > 120;

    }

  @HostListener('document:click', ['$event'])
    clickOutside(event: MouseEvent) {

      if (!this.eRef.nativeElement.contains(event.target)) {

          this.menuOpen = false;
          this.serviceOpen = false;

      }

  }

  constructor(
    private eRef: ElementRef,
    public router: Router,
    public languageService: LanguageService
  ) {}

  get isServicesRoute(): boolean {

    return this.router.url.startsWith('/services');

  }

  get alwaysGlass(): boolean {

      return this.router.url !== '/';

  }

  get glassHeader(): boolean {

      return this.alwaysGlass || this.isScrolled || this.menuOpen;

  }

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

  toggleServices(): void {

    this.serviceOpen = !this.serviceOpen;

  }

  changeLanguage(lang: string): void {
    this.languageService.switchLanguage(lang);
  }
}