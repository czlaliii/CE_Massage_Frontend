import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Service {
    id: string;
    name: string;
    duration_minutes: number;
    price: number;
}

export interface Booking {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string | null;
    date: string;
    startTime: string;
    endTime: string;
    serviceName: string;
}

export interface RescheduleBooking {
    id: string;
    customerName: string;
    customerEmail: string;
    date: string;
    startTime: string;
    endTime: string;
    serviceId: string;
    serviceName: string;
}

export interface DashboardStats {

    todayBookings: number;

    todayRevenue: number;

    monthBookings: number;

    monthRevenue: number;

    revenueByDay: {
        date: string;
        revenue: number;
    }[];
}

export interface DashboardStats {

    todayBookings: number;

    todayRevenue: number;

    monthBookings: number;

    monthRevenue: number;
}

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    private http = inject(HttpClient);

    getServices(): Observable<Service[]> {
        return this.http.get<Service[]>(
        `${environment.apiUrl}/services`
        );
    }

    getSlots(
        date: string,
        serviceId: string
    ): Observable<string[]> {

        return this.http.get<string[]>(
        `${environment.apiUrl}/slots?date=${date}&serviceId=${serviceId}`
        );
    }

    getBookingByToken(
        token: string
    ): Observable<RescheduleBooking> {

        return this.http.get<RescheduleBooking>(
            `${environment.apiUrl}/bookings/reschedule/${token}`
        );
    }

    rescheduleBooking(
        token: string,
        bookingDate: string,
        startTime: string
    ) {

        return this.http.post(
            `${environment.apiUrl}/bookings/reschedule/${token}`,
            {
                bookingDate,
                startTime
            }
        );
    }

    createBooking(body: any) {
        return this.http.post(
        `${environment.apiUrl}/bookings`,
        body
        );
    }

    cancelBooking(bookingId: string) {
        return this.http.delete(
            `${environment.apiUrl}/bookings/${bookingId}`
        );
    }

    getBookings(date?: string) {
        const url = date
            ? `${environment.apiUrl}/bookings?date=${date}`
            : `${environment.apiUrl}/bookings`;

        return this.http.get<Booking[]>(url);
    }

    getDashboardStats() {

        return this.http.get<DashboardStats>(
            `${environment.apiUrl}/admin/dashboard`
        );
    }
}