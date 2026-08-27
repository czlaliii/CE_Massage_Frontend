import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ServiceOption {

    id: string;

    duration_minutes: number;

    price: number;
}

export interface Service {

    id: string;

    name: string;

    service_options: ServiceOption[];
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

    yearBookings: number;
    yearRevenue: number;

    totalBookings: number;
    totalRevenue: number;

    bookingsByDay: {
        date: string;
        bookings: number;
    }[];

    revenueByDay: {
        date: string;
        revenue: number;
    }[];
}

export interface BlockedTime {

    id: string;

    booking_date: string;

    start_time: string;

    end_time: string;

    title: string;
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
        serviceOptionId: string
    ): Observable<string[]> {

        return this.http.get<string[]>(
        `${environment.apiUrl}/slots?date=${date}&serviceOptionId=${serviceOptionId}`
        );
    }

    getBookingByToken(
        token: string
    ): Observable<RescheduleBooking> {

        return this.http.get<RescheduleBooking>(
            `${environment.apiUrl}/bookings/reschedule/${token}`
        );
    }

    getBlockedTimes() {

        return this.http.get<BlockedTime[]>(
            `${environment.apiUrl}/admin/blocked-times`
        );

    }

    createBlockedTime(body: {
        booking_date: string;
        start_time: string;
        end_time: string;
        title: string;
    }) {

        return this.http.post<BlockedTime>(
            `${environment.apiUrl}/admin/blocked-times`,
            body
        );

    }

    updateBlockedTime(
        id: string,
        body: {
            booking_date: string;
            start_time: string;
            end_time: string;
            title: string;
        }
    ) {

        return this.http.put<BlockedTime>(
            `${environment.apiUrl}/admin/blocked-times/${id}`,
            body
        );

    }

    deleteBlockedTime(id: string) {

        return this.http.delete(
            `${environment.apiUrl}/admin/blocked-times/${id}`
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

    createAdminBooking(body: any) {

        return this.http.post(
            `${environment.apiUrl}/admin/bookings`,
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

    getDashboardStats(
        year: number,
        month: number
    ) {
        return this.http.get<DashboardStats>(
            `${environment.apiUrl}/admin/dashboard?year=${year}&month=${month}`
        );
    }

    getAvailableDates(
        serviceOptionId: string
    ) {

        return this.http.get<string[]>(
            `${environment.apiUrl}/availability?serviceOptionId=${serviceOptionId}`
        );

    }
}