import { Component, HostListener, ElementRef, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../services/Language.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgOptimizedImage, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
  encapsulation: ViewEncapsulation.None
})
export class Header {
  menuOpen = false;
  serviceOpen = false;
  currentLanguage: string;

  constructor(
    private eRef: ElementRef,
    private languageService: LanguageService
  )
  {
    this.currentLanguage = this.languageService.getCurrentLanguage();
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

  toggleServices() {
    if (window.innerWidth <= 1024) {
      this.serviceOpen = !this.serviceOpen;
    }
  }

  changeLanguage(lang: string): void {
    this.languageService.switchLanguage(lang);
    this.currentLanguage = lang;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.menuOpen = false;
      this.serviceOpen = false;
    }
  }
}

