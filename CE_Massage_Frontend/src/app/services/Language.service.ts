import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    currentLanguage = signal<string>('hu');

    constructor(private translate: TranslateService) {
        const savedLanguage =
            localStorage.getItem('language') || 'hu';
        translate.setFallbackLang('hu');
        translate.use(savedLanguage);
        this.currentLanguage.set(savedLanguage);
    }

    switchLanguage(lang: string): void {
        this.translate.use(lang);
        localStorage.setItem('language', lang);
        this.currentLanguage.set(lang);
    }
}