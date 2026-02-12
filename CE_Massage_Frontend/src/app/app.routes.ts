import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { GalleryComponent } from './pages/gallery/gallery';
import { FiveContinentsComponent } from './pages/services/five-continents/five-continents';
import { ExpanseComponent } from './pages/services/expanse/expanse';
import { VibecodesComponent } from './pages/services/vibecodes/vibecodes';
import { FaqComponent } from './pages/faq/faq';
import { AboutComponent } from './pages/about/about';
import { PricesComponent } from './pages/prices/prices';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
    path: 'services',
    children: [
        { path: 'five-continents', component: FiveContinentsComponent },
        { path: 'expanse', component: ExpanseComponent },
        { path: 'vibecodes', component: VibecodesComponent }
        ]
    },
    { path: 'gallery', component: GalleryComponent },
    { path: 'about', component: AboutComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'prices', component: PricesComponent},
    { path: '**', redirectTo: '' }
];