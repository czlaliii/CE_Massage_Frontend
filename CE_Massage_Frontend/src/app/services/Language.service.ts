import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    private readonly STORAGE_KEY = 'language';

    constructor(private translate: TranslateService) {

        this.translate.addLangs(['hu', 'en']);
        this.translate.setDefaultLang('hu');

        const savedLanguage = localStorage.getItem(this.STORAGE_KEY);

        if (savedLanguage && ['hu', 'en'].includes(savedLanguage)) {
        this.translate.use(savedLanguage);
        } else {
        this.translate.use('hu');
        localStorage.setItem(this.STORAGE_KEY, 'hu');
        }
    }

    switchLanguage(lang: string): void {
        this.translate.use(lang);
        localStorage.setItem(this.STORAGE_KEY, lang);
    }

    getCurrentLanguage(): string {
        return this.translate.currentLang || 'hu';
    }
}