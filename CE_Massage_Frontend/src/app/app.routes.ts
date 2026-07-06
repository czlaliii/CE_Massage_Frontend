import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { GalleryComponent } from './pages/gallery/gallery';
import { FiveContinentsComponent } from './pages/services/five-continents/five-continents';
import { ExpanseComponent } from './pages/services/expanse/expanse';
import { VibecodesComponent } from './pages/services/vibecodes/vibecodes';
import { FaqComponent } from './pages/faq/faq';
import { AboutComponent } from './pages/about/about';
import { PricesComponent } from './pages/prices/prices';
import { BookingComponent } from './pages/booking/booking';
import { AdminBookings } from './pages/admin-bookings/admin-bookings';
import { AdminLogin } from './pages/admin-login/admin-login';
import { authGuard } from './guards/auth.guard';

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
    { path: 'booking', component: BookingComponent },
    { path: 'admin/login', component: AdminLogin},
    { path: 'admin/bookings', component: AdminBookings, canActivate: [authGuard]},
    {
        path: 'reschedule/:token',
        loadComponent: () =>
            import('./pages/reschedule/reschedule')
            .then(
                component =>
                    component.Reschedule
            )
    },
     {
        path: 'payment-success',
        loadComponent: () =>
        import('./pages/payment-success/payment-success')
            .then(m => m.PaymentSuccess)
    },

    {
        path: 'payment-cancel',
        loadComponent: () =>
        import('./pages/payment-cancel/payment-cancel')
            .then(m => m.PaymentCancel)
    },
    { path: '**', redirectTo: '' }
];