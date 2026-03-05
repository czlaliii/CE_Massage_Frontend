import { Component } from '@angular/core';
import { Review } from "../review/review";
import { ReviewsService } from './reviews.service';

@Component({
  selector: 'app-reviews',
  imports: [Review],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class Reviews {

  currentIndex = 0;
  autoPlayInterval: any;
  readonly cardsToShow = 1;

  constructor(private reviewsService: ReviewsService) {}

  get reviews() {
    return this.reviewsService.getReviews({});
  }

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  get maxIndex(): number {
    return Math.max(0, this.reviews.length - 1);
  }

  get transformValue(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  nextSlide() {
    this.currentIndex = this.currentIndex < this.maxIndex
      ? this.currentIndex + 1
      : 0;
  }

  prevSlide() {
    this.currentIndex = this.currentIndex > 0
      ? this.currentIndex - 1
      : this.maxIndex;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
  }

  pauseAutoPlay() { this.stopAutoPlay(); }
  resumeAutoPlay() { this.startAutoPlay(); }
}