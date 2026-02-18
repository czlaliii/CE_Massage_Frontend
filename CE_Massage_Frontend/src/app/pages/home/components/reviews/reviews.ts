import { Component } from '@angular/core';
import { Review } from "../review/review";
import { ReviewsService } from './reviews.service';
import { ReviewDto } from '../review/review.model';

@Component({
  selector: 'app-reviews',
  imports: [Review],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class Reviews {

  currentIndex = 0;
  autoPlayInterval: any;
  cardsToShow = 3;

  constructor(private reviewsService: ReviewsService) {}

  get reviews() {
    return this.reviewsService.getReviews({});
  }

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
