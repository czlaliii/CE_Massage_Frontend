import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  Booking,
  BookingService,
  DashboardStats
} from '../../services/booking.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import huLocale from '@fullcalendar/core/locales/hu';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { Router } from '@angular/router';

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-admin-bookings',
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './admin-bookings.html',
  styleUrl: './admin-bookings.css',
})

export class AdminBookings implements OnInit {

  private bookingService =
    inject(BookingService);

  private router =
    inject(Router);

  bookings =
    signal<Booking[]>([]);

  selectedDate =
    signal('');

    dashboardStats =
      signal<DashboardStats | null>(
          null
      );

  ngOnInit(): void {
    this.loadBookings();
    this.loadDashboardStats();
  }

  selectedBooking =
  signal<Booking | null>(null);

  showModal =
    signal(false);

  calendarOptions = signal<CalendarOptions>({
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin
    ],

    initialView: 'timeGridWeek',

    locale: huLocale,

    height: 'auto',

    slotMinTime: '09:00:00',
    slotMaxTime: '18:00:00',

    allDaySlot: false,

    nowIndicator: true,

    weekends: true,

    editable: false,

    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridDay,timeGridWeek,dayGridMonth'
    },

  //   eventContent: (arg) => {

  //   return {

  //     html: `
  //       <div>
  //         <strong>
  //           ${arg.event.title}
  //         </strong>
  //         <br>
  //         <small>
  //           ${arg.event.extendedProps['serviceName']}
  //         </small>
  //       </div>
  //     `
  //   };
  // },

    eventClick: (info) => {

    const booking =
      this.bookings().find(
        booking =>
          booking.id === info.event.id
      );

    if (!booking) {
      return;
    }

    this.selectedBooking.set(
      booking
    );

    this.showModal.set(
      true
    );
  }
  });

  closeModal(): void {

    this.showModal.set(
      false
    );

    this.selectedBooking.set(
      null
    );
  }

  private updateCalendarEvents(
    bookings: Booking[]
  ): void {

    const events = bookings.map(
    booking => ({

      id: booking.id,

      title:
        `${booking.customerName}`,

      start:
        `${booking.date}T${booking.startTime}`,

      end:
        `${booking.date}T${booking.endTime}`,

      backgroundColor:
        this.getEventColor(
          booking.serviceName
        ),

      borderColor:
        this.getEventColor(
          booking.serviceName
        ),

      extendedProps: {

        serviceName:
          booking.serviceName
      }
    })
  );

    this.calendarOptions.update(
      options => ({
        ...options,
        events
      })
      
    );
    console.log(events);
  }

  private createRevenueChart(
      stats: DashboardStats
  ): void {

      const canvas =
          document.getElementById(
              'revenueChart'
          ) as HTMLCanvasElement;

      if (!canvas) {
          return;
      }

      new Chart(canvas, {

          type: 'line',

          data: {

              labels:
                  stats.revenueByDay.map(
                      day =>
                          day.date
                  ),

              datasets: [
                  {
                      label:
                          'Napi bevétel',

                      data:
                          stats.revenueByDay.map(
                              day =>
                                  day.revenue
                          )
                  }
              ]
          },

          options: {

              responsive: true,

              plugins: {

                  legend: {
                      display: true
                  }
              }
          }
      });
  }

  loadBookings(): void {

    this.bookingService
      .getBookings()
      .subscribe(bookings => {

        this.bookings.set(bookings);

        this.updateCalendarEvents(
          bookings
        );

      });
  }

  getStartMinutes(
    booking: Booking
  ): number {

    const [hours, minutes] =
      booking.startTime
        .split(':')
        .map(Number);

    return hours * 60 + minutes;
  }

  getDuration(
  booking: Booking
): number {

    const [startHour, startMinute] =
      booking.startTime
        .split(':')
        .map(Number);

    const [endHour, endMinute] =
      booking.endTime
        .split(':')
        .map(Number);

    return (
      (endHour * 60 + endMinute) -
      (startHour * 60 + startMinute)
    );
  }

  deleteBooking(
      bookingId: string
  ) {

      const confirmed =
          confirm(
              'Biztosan törölni szeretnéd ezt a foglalást?'
          );

      if (!confirmed) {
          return;
      }

      this.bookingService
          .cancelBooking(
              bookingId
          )
          .subscribe({

              next: () => {

                this.closeModal();

                this.loadBookings();

              },

              error: error => {

                  console.error(error);

              }
          });
  }

  timeSlots =
  Array.from(
    { length: 18 },
    (_, index) => {

      const hour =
        9 + Math.floor(index / 2);

      const minute =
        index % 2 === 0
          ? '00'
          : '30';

      return `${hour}:${minute}`;
    }
  );

  private getEventColor(
    serviceName: string
  ): string {

    switch (serviceName) {

      case '5 Kontinens Masszázs':
        return '#4CAF50';

      case 'Expanse Terápia':
        return '#2196F3';

      case 'Vibecodes':
        return '#9C27B0';

      default:
        return '#607D8B';
    }
  }

  loadDashboardStats(): void {

      this.bookingService
          .getDashboardStats()
          .subscribe(stats => {

              this.dashboardStats.set(
                  stats
              );

              setTimeout(() => {

                  this.createRevenueChart(
                      stats
                  );

              });
          });
  }

  logout(): void {

    localStorage.removeItem(
      'admin_token'
    );

    this.router.navigate([
      '/admin/login'
    ]);
  }
}