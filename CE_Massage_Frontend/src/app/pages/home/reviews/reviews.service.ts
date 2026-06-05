import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ReviewsService {

    private reviews = [
        {
            id: 1,
            textKey: 'HOME.REVIEWS.REVIEW_1',
            author: 'Bence'
        },
        {
            id: 2,
            textKey: 'HOME.REVIEWS.REVIEW_2',
            author: 'Francisca S. O., Spanyolország'
        },
        {
            id: 3,
            textKey: 'HOME.REVIEWS.REVIEW_3',
            author: 'Nándor'
        },
        {
            id: 4,
            textKey: 'HOME.REVIEWS.REVIEW_4',
            author: 'Maria'
        },
        {
            id: 5,
            textKey: 'HOME.REVIEWS.REVIEW_5',
            author: 'Zia, Dubaj'
        },
        {
            id: 6,
            textKey: 'HOME.REVIEWS.REVIEW_6',
            author: 'Elisabeth'
        },
        {
            id: 7,
            textKey: 'HOME.REVIEWS.REVIEW_7',
            author: 'Niki'
        },
        {
            id: 8,
            textKey: 'HOME.REVIEWS.REVIEW_8',
            author: 'A. Shrivastava, India'
        },
        {
            id: 9,
            textKey: 'HOME.REVIEWS.REVIEW_9',
            author: 'Bogdana'
        },
        {
            id: 10,
            textKey: 'HOME.REVIEWS.REVIEW_10',
            author: 'Luana, Brazília'
        }
    ];

    getReviews() {
        return this.reviews;
    }
}