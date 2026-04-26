import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ReviewsService {
    private reviews = [
        {
            id: 1,
            text: "Életem első masszázsa volt, de nagyon jó élmény volt, ajánlom a helyet, kifejezetten Edinát! Nagyon jó beszélgetőtárs és odafigyelt rám végig.",
            author: "Bence"
        },
        {
            id: 2,
            text: "Edina masszázsa tökéletessé tette a budapesti látogatásomat.",
            author: "Francisca S. O., Spanyolország"
        },
        {
            id: 3,
            text: "Czinege Edinánál voltam és tökéletes választásnak bizonyult! Nagyon kedves, profi és intelligens masszőr, aki pontosan tudja, hogy épp mire van szüksége a vendégének. Három év után kezdtem újra a futást, így mindenem fájt, de Edina nálam is jobban érezte, hogy mely területekre érdemes kiemelten fókuszálni. Ez is bizonyítja, hogy mestere szakmájának, így csak ajánlani tudom!",
            author: "Nándor"
        },
        {
            id: 4,
            text: "Edinánál jártam! Nagyon szuper csodás kezei vannak! Remekül masszíroz! Nagyon ajánlom mindenkinek!",
            author: "Maria"
        },
        {
            id: 5,
            text: "Nagyon kellemes wellness kezelés volt, a masszázs utáni energia különleges volt!",
            author: "Zia, Dubaj"
        },
        {
            id: 6,
            text: "Sok masszőrnél megfordultam már és magabiztosan mondhatom, hogy az egyik legjobb élményben volt Edinánál részem. Már le is foglaltam a következő időpontom.",
            author: "Elisabeth"
        },
        {
            id: 7,
            text: "Nagyon köszönöm az 5 kontinens masszázst, isteni volt, egész nap chill-ben voltam 2 cm-el a föld fölött. :D Te vagy a kedvenc masszőröm.",
            author: "Niki"
        },
        {
            id: 8,
            text: "Edina egy fantasztikus 5 kontinens masszázst adott, nagyon képzett. Mindenképpen ajánlom.",
            author: "A. Shrivastava, India"
        },
        {
            id: 9,
            text: "Nagyon kedves, barátságos és igazi profi. Edinának erős kezei vannak és ismeri a triggerpontokat. Nagyon szépen köszönöm <3 <3 <3",
            author: "Bogdana"
        },
        {
            id: 10,
            text: "Nagyon jól éreztem magam az 5 kontinens masszázson, Edina valóban tehetséges.",
            author: "Luana, Brazília"
        }
    ];

    getReviews({}) {
        return this.reviews;
    }
}