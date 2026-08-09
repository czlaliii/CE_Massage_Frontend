import { Injectable, signal } from '@angular/core';

export type CookieConsent = 'accepted' | 'necessary' | null;

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  private readonly STORAGE_KEY = 'ce_cookie_consent';

  consent = signal<CookieConsent>(null);

  showBanner = signal(false);

  constructor() {

    const saved = localStorage.getItem(this.STORAGE_KEY) as CookieConsent;

    if (saved) {

        this.consent.set(saved);
        this.showBanner.set(false);

    } else {

        this.showBanner.set(true);

    }

  }

  acceptAll() {

      localStorage.setItem(this.STORAGE_KEY, 'accepted');

      this.consent.set('accepted');

      this.showBanner.set(false);

  }

  acceptNecessary() {

    localStorage.setItem(this.STORAGE_KEY, 'necessary');

    this.consent.set('necessary');

    this.showBanner.set(false);

  }

  reset() {

    localStorage.removeItem(this.STORAGE_KEY);

    this.consent.set(null);

    this.showBanner.set(true);

  }

  openSettings() {

    window.scrollTo({

        top: 0,

        behavior: 'smooth'

    });

    this.showBanner.set(true);

  }

  get shouldShowBanner(): boolean {

    return this.showBanner();

  }

  get mapsAllowed(): boolean {

    return this.consent() === 'accepted';

  }

}