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

  todayBookings = signal<Booking[]>([]);

  bookings =
    signal<Booking[]>([]);

  selectedDate =
    signal('');

  dashboardStats =
    signal<DashboardStats | null>(
        null
    );

  selectedMonth = signal(
    new Date().getMonth() + 1
  );

  selectedYear = signal(
      new Date().getFullYear()
  );

    months = [
      { value: 1, name: 'Január' },
      { value: 2, name: 'Február' },
      { value: 3, name: 'Március' },
      { value: 4, name: 'Április' },
      { value: 5, name: 'Május' },
      { value: 6, name: 'Június' },
      { value: 7, name: 'Július' },
      { value: 8, name: 'Augusztus' },
      { value: 9, name: 'Szeptember' },
      { value: 10, name: 'Október' },
      { value: 11, name: 'November' },
      { value: 12, name: 'December' }
  ];

  currentYear = new Date().getFullYear();

  years = Array.from(
      { length: 10 },
      (_, i) => this.currentYear - 5 + i
  );

  ngOnInit(): void {
    this.loadBookings();
    this.loadDashboardStats();
    console.log(
    this.selectedMonth(),
    this.selectedYear()
);
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

    displayEventTime: false,

    initialView: 'timeGridWeek',

    locale: huLocale,

    height: 'auto',

    slotMinTime: '08:00:00',
    slotMaxTime: '20:00:00',

    allDaySlot: false,

    nowIndicator: true,

    weekends: true,

    editable: false,

    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridDay,timeGridWeek,dayGridMonth'
    },

    eventDidMount(info){

      if(info.view.type==="dayGridMonth"){

          info.el.style.borderLeft =
              `5px solid ${info.event.backgroundColor}`;

          info.el.style.borderRadius="6px";

      }

    },

    eventContent: (arg) => {

      console.log(arg.event.backgroundColor);

      const view = arg.view.type;

      const service =
          this.shortServiceName(
              arg.event.extendedProps['serviceName']
          );

      const duration =
          arg.event.extendedProps['duration'];

      if (arg.view.type === 'dayGridMonth') {

          return {
              html: `
                  <div class="month-booking">
                      ${arg.event.title}
                  </div>
              `
          };

      }

      return {

          html: `
              <div class="calendar-event">

                  <div class="calendar-name">
                      ${arg.event.title}
                  </div>

                  <div class="calendar-service">
                      ${service}
                  </div>

                  ${
                      duration >= 60
                      ? `<div class="calendar-duration">${duration} perc</div>`
                      : ''
                  }

              </div>
          `
      };

  },

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

  changeMonth(event: Event){

      this.selectedMonth.set(
          Number(
              (event.target as HTMLSelectElement).value
          )
      );

      this.loadDashboardStats();

  }

  changeYear(event: Event){

      this.selectedYear.set(
          Number(
              (event.target as HTMLSelectElement).value
          )
      );

      this.loadDashboardStats();

  }

  closeModal(): void {

    this.showModal.set(
      false
    );

    this.selectedBooking.set(
      null
    );
  }

  formatPrice(price: number): string {

      return new Intl.NumberFormat(
          'hu-HU'
      ).format(price);

  }

  private updateCalendarEvents(
      bookings: Booking[]
    ): void {

      console.log(bookings[0]);

      const events = bookings.map(booking => ({

      id: booking.id,

      title: booking.customerName,

      start: `${booking.date}T${booking.startTime}`,

      end: `${booking.date}T${booking.endTime}`,

      backgroundColor:
          this.getEventColor(
              booking.serviceName
          ),

      borderColor:
          this.getEventColor(
              booking.serviceName
          ),

      textColor: '#fff',

      extendedProps: {

          serviceName:
              booking.serviceName,

          duration:
              this.getDuration(
                  booking
              )

      }

  }));

    this.calendarOptions.update(
      options => ({
        ...options,
        events
      })
      
    );
    console.log(events);
  }

  private shortServiceName(
      serviceName: string
  ): string {

      switch (serviceName) {

          case '5 Kontinens Masszázs':
              return '5 Kontinens';

          case 'Expanse Terápia':
              return 'Expanse';

          case 'Vibecodes':
              return 'Vibecodes';

          default:
              return serviceName;
      }

  }

  private createBookingsChart(
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

                stats.bookingsByDay.map(
                    day => this.formatChartDate(day.date)
                ),

            datasets: [

                {

                    label: 'Foglalások',

                    data:

                        stats.bookingsByDay.map(
                            day => day.bookings
                        ),

                    tension: .35,

                    borderWidth: 3,

                    pointRadius: 5,

                    pointHoverRadius: 7,

                    fill: true

                }

            ]

        },

        options: {

            responsive: true,

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        precision: 0,

                        stepSize: 1

                    }

                }

            }

        }

    });
  }

  formatChartDate(date: string): string {

      return new Date(date)
          .toLocaleDateString(

              'hu-HU',

              {

                  weekday: 'short',

                  day: 'numeric'

              }

          );

  }

  loadBookings(): void {

    this.bookingService
        .getBookings()
        .subscribe(bookings => {

            this.bookings.set(bookings);

            this.todayBookings.set(

                bookings.filter(

                    booking =>

                        booking.date ===
                        new Date()
                            .toISOString()
                            .split('T')[0]

                )

            );

            this.updateCalendarEvents(bookings);

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
            return '#D4AF37'; // arany

        case 'Expanse Terápia':
            return '#5A8DEE'; // kék

        case 'Vibecodes':
            return '#8E44AD'; // lila

        default:
            return '#95A5A6';
    }
  }

  loadDashboardStats(): void {

      this.bookingService.getDashboardStats(

        this.selectedYear(),

        this.selectedMonth()

    )
    .subscribe(stats => {

        this.dashboardStats.set(stats);

        setTimeout(() => {
            this.createBookingsChart(stats);
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