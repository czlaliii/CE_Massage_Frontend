import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Reviews } from './components/reviews/reviews';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule, Reviews, CommonModule, NgOptimizedImage],
  templateUrl: './home.html',
  styleUrl: './home.css',
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0, transform: 'translateX(-100px)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
    currentIndex = 0;
    autoPlayInterval: any;
    cardsToShow = 3;

    reviews = [
      {
        text: "Edina masszázsa csodálatos élmény volt! Már az első alkalom után éreztem a változást a testemben és az elmémben is.",
        author: "Katalin, Budapest"
      },
      {
        text: "Biztonságban éreztem magam, teljesen ki tudtam kapcsolni. Nagyon feltöltött.",
        author: "Anna"
      },
      {
        text: "Edina szakértelme és figyelme minden részletre lenyűgöző. Minden alkalommal újra és újra visszatérek hozzá.",
        author: "Miklós, Debrecen"
      },
      {
        text: "Az Expanse terápia teljesen megváltoztatta az életemet. Edina segített megtalálni a belső békét és egyensúlyt.",
        author: "Zsófia"
      },
      {
        text: "A Vibecodes kezelés fantasztikus volt! Soha nem éreztem még ilyen mély relaxációt és feltöltődést.",
        author: "Gábor, Szeged"
      },
      {
        text: "Edina masszázsa nem csak a testemet, hanem a lelkemet is gyógyította. Hálás vagyok érte.",
        author: "Eszter"
      }
    ];

  ngOnInit() {
    this.updateCardsToShow();
    window.addEventListener('resize', () => this.updateCardsToShow());
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
    window.removeEventListener('resize', () => this.updateCardsToShow());
  }

  updateCardsToShow() {
    if (window.innerWidth <= 768) {
      this.cardsToShow = 1;
    } else if (window.innerWidth <= 1024) {
      this.cardsToShow = 2;
    } else {
      this.cardsToShow = 3;
    }
  }

  get maxIndex(): number {
    return Math.max(0, this.reviews.length - this.cardsToShow);
  }

  get transformValue(): string {
    const cardWidth = 100 / this.cardsToShow;
    return `translateX(-${this.currentIndex * cardWidth}%)`;
  }

  nextSlide() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.maxIndex;
    }
  }

  goToSlide(index: number) {
    if (index <= this.maxIndex) {
      this.currentIndex = index;
    }
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  pauseAutoPlay() {
    this.stopAutoPlay();
  }

  resumeAutoPlay() {
    this.startAutoPlay();
  }
}