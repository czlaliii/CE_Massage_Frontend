import { Injectable } from '@angular/core';
import { ReviewDto } from '../review/review.model';

@Injectable({providedIn: 'root'})
export class ReviewsService {
    private reviews = [
        {
            id: 1,
            text: "Edina masszázsa csodálatos élmény volt! Már az első alkalom után éreztem a változást a testemben és az elmémben is.",
            author: "Katalin, Budapest"
        },
        {
            id: 2,
            text: "Biztonságban éreztem magam, teljesen ki tudtam kapcsolni. Nagyon feltöltött.",
            author: "Anna"
        },
        {
            id: 3,
            text: "Edina szakértelme és figyelme minden részletre lenyűgöző. Minden alkalommal újra és újra visszatérek hozzá.",
            author: "Miklós, Debrecen"
        },
        {
            id: 4,
            text: "Az Expanse terápia teljesen megváltoztatta az életemet. Edina segített megtalálni a belső békét és egyensúlyt.",
            author: "Zsófia"
        },
        {
            id: 5,
            text: "A Vibecodes kezelés fantasztikus volt! Soha nem éreztem még ilyen mély relaxációt és feltöltődést.",
            author: "Gábor, Szeged"
        },
        {
            id: 6,
            text: "Edina masszázsa nem csak a testemet, hanem a lelkemet is gyógyította. Hálás vagyok érte.",
            author: "Eszter"
        }
    ];

    getReviews({}) {
        return this.reviews;
    }
}