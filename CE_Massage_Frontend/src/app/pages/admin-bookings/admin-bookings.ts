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
    DashboardStats,
    Service,
    BlockedTime
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

    showCreateBookingModal =
    signal(false);

    adminServices =
        signal<Service[]>([]);

    adminSelectedServiceOptionId =
        signal('');

    adminSelectedDate =
        signal('');

    adminSelectedSlot =
        signal('');

    adminAvailableSlots =
        signal<string[]>([]);

    adminCustomerName =
        signal('');

    adminCustomerEmail =
        signal('');

    adminCustomerPhone =
        signal('');

    adminSendEmail =
        signal(true);

    adminBookingLoading =
        signal(false);

    adminBookingError =
        signal('');

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

    blockedTimes =
    signal<BlockedTime[]>([]);

    showBlockedModal =
    signal(false);

    selectedBlockedTime =
        signal<BlockedTime | null>(null);

    blockedTitle =
        signal('');

    blockedDate =
        signal('');

    blockedStartTime =
        signal('08:00');

    blockedEndTime =
        signal('20:00');

    blockedLoading =
        signal(false);

    notification = signal<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    private notificationTimer?: ReturnType<typeof setTimeout>;

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
        this.loadBlockedTimes();
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

        editable: true,

        eventStartEditable: true,

        eventDurationEditable: true,

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

            const type =
                arg.event.extendedProps['type'];


            if (type === 'blocked') {

                return {

                    html: `
                        <div class="calendar-blocked">

                            <div class="calendar-blocked-title">
                                ${arg.event.title}
                            </div>

                        </div>
                    `

                };

            }


            const service =
                this.shortServiceName(
                    arg.event.extendedProps['serviceName']
                );

            const duration =
                arg.event.extendedProps['duration'];


            if (
                arg.view.type === 'dayGridMonth'
            ) {

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
                                ? `
                                    <div class="calendar-duration">
                                        ${duration} perc
                                    </div>
                                `
                                : ''
                        }

                    </div>
                `

            };

        },

        eventClick: (info) => {

            const type =
                info.event.extendedProps['type'];


            if (type === 'blocked') {

                const blockedId =
                    info.event.extendedProps[
                        'blockedTimeId'
                    ];


                const blocked =
                    this.blockedTimes().find(
                        item =>
                            item.id === blockedId
                    );


                if (!blocked) {
                    return;
                }


                this.selectedBlockedTime.set(
                    blocked
                );

                this.blockedTitle.set(
                    blocked.title
                );

                this.blockedDate.set(
                    blocked.booking_date
                );

                this.blockedStartTime.set(
                    blocked.start_time.substring(0, 5)
                );

                this.blockedEndTime.set(
                    blocked.end_time.substring(0, 5)
                );

                this.showBlockedModal.set(
                    true
                );

                return;
            }


            // meglévő booking logika

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

        },

        eventDrop: (info) => {

            const type =
                info.event.extendedProps['type'];


            if (type !== 'blocked') {

                info.revert();

                return;
            }


            const blockedId =
                info.event.extendedProps[
                    'blockedTimeId'
                ];


            const blocked =
                this.blockedTimes().find(
                    item =>
                        item.id === blockedId
                );


            if (!blocked) {

                info.revert();

                return;
            }


            if (!info.event.start) {

                info.revert();

                return;
            }


            const start =
                info.event.start;


            const end =
                info.event.end;


            if (!end) {

                info.revert();

                return;
            }


            const body = {

                booking_date:
                    this.formatCalendarDate(
                        start
                    ),

                start_time:
                    this.formatCalendarTime(
                        start
                    ),

                end_time:
                    this.formatCalendarTime(
                        end
                    ),

                title:
                    blocked.title

            };


            this.bookingService
                .updateBlockedTime(
                    blocked.id,
                    body
                )
                .subscribe({

                    next: updated => {

                        this.blockedTimes.update(
                            blocks =>
                                blocks.map(
                                    block =>
                                        block.id === updated.id
                                            ? updated
                                            : block
                                )
                        );

                        this.showNotification(
                            'A szabadidő sáv időpontja módosítva.',
                            'success'
                        );

                    },

                    error: error => {

                        console.error(
                            'Blocked time move failed:',
                            error
                        );


                        info.revert();


                        if (error.status === 409) {

                            this.showNotification(
                                error.error?.message
                                ??
                                'Az új időpont ütközik egy meglévő időponttal.'
                            );

                        } else {

                            this.showNotification(
                                'Nem sikerült áthelyezni a szabadidő sávot.'
                            );

                        }

                    }

                });

        },

        eventResize: (info) => {

            const type =
                info.event.extendedProps['type'];


            if (type !== 'blocked') {

                info.revert();

                return;
            }


            const blockedId =
                info.event.extendedProps[
                    'blockedTimeId'
                ];


            const blocked =
                this.blockedTimes().find(
                    item =>
                        item.id === blockedId
                );


            if (!blocked) {

                info.revert();

                return;
            }


            if (
                !info.event.start ||
                !info.event.end
            ) {

                info.revert();

                return;
            }


            const body = {

                booking_date:
                    this.formatCalendarDate(
                        info.event.start
                    ),

                start_time:
                    this.formatCalendarTime(
                        info.event.start
                    ),

                end_time:
                    this.formatCalendarTime(
                        info.event.end
                    ),

                title:
                    blocked.title

            };


            this.bookingService
                .updateBlockedTime(
                    blocked.id,
                    body
                )
                .subscribe({

                    next: updated => {

                        this.blockedTimes.update(
                            blocks =>
                                blocks.map(
                                    block =>
                                        block.id === updated.id
                                            ? updated
                                            : block
                                )
                        );

                    },

                    error: error => {

                        console.error(
                            'Blocked time resize failed:',
                            error
                        );


                        info.revert();


                        if (
                            error.status === 409
                        ) {

                            alert(
                                error.error?.message
                                ??
                                'Az új időszak ütközik egy meglévő időponttal.'
                            );

                        } else {

                            alert(
                                'Nem sikerült módosítani a szabadidő sávot.'
                            );

                        }

                    }

                });

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

    openCreateBookingModal(): void {

        this.showCreateBookingModal.set(true);

        this.adminSelectedServiceOptionId.set('');
        this.adminSelectedDate.set('');
        this.adminSelectedSlot.set('');

        this.adminCustomerName.set('');
        this.adminCustomerEmail.set('');
        this.adminCustomerPhone.set('');

        this.adminAvailableSlots.set([]);
        this.adminBookingError.set('');

        this.bookingService
            .getServices()
            .subscribe({

                next: services => {

                    this.adminServices.set(
                        services
                    );

                },

                error: error => {

                    console.error(
                        'Admin services loading failed:',
                        error
                    );

                    this.adminBookingError.set(
                        'A szolgáltatások betöltése sikertelen.'
                    );

                }

            });
    }

    closeCreateBookingModal(): void {

        if (this.adminBookingLoading()) {
            return;
        }

        this.showCreateBookingModal.set(false);

    }

    loadBlockedTimes(): void {

        this.bookingService
            .getBlockedTimes()
            .subscribe({

                next: blockedTimes => {

                    this.blockedTimes.set(
                        blockedTimes
                    );

                    this.updateCalendarEvents(
                        this.bookings()
                    );

                },

                error: error => {

                    console.error(
                        'Blocked times loading failed:',
                        error
                    );

                }

            });
    }

    openCreateBlockedModal(): void {

        this.selectedBlockedTime.set(null);

        this.blockedTitle.set(
            'Szabadidő'
        );

        this.blockedDate.set(
            new Date()
                .toISOString()
                .split('T')[0]
        );

        this.blockedStartTime.set(
            '08:00'
        );

        this.blockedEndTime.set(
            '20:00'
        );

        this.showBlockedModal.set(
            true
        );
    }

    saveBlockedTime(): void {

        const body = {

            booking_date:
                this.blockedDate(),

            start_time:
                this.blockedStartTime(),

            end_time:
                this.blockedEndTime(),

            title:
                this.blockedTitle().trim()
                    || 'Szabadidő'

        };


        if (
            !body.booking_date ||
            !body.start_time ||
            !body.end_time
        ) {

            return;
        }


        if (
            body.end_time <=
            body.start_time
        ) {

            this.showNotification(
                'A befejezési időnek későbbinek kell lennie a kezdési időnél.'
            );

            return;
        }


        this.blockedLoading.set(true);


        const selected =
            this.selectedBlockedTime();


        const request = selected

            ? this.bookingService
                .updateBlockedTime(
                    selected.id,
                    body
                )

            : this.bookingService
                .createBlockedTime(
                    body
                );


        request.subscribe({

            next: () => {

                this.blockedLoading.set(
                    false
                );

                this.closeBlockedModal();

                this.loadBlockedTimes();

            },

            error: error => {

                console.error(
                    'Blocked time save failed:',
                    error
                );

                this.blockedLoading.set(
                    false
                );


                if (error.status === 409) {

                    this.showNotification(
                        error.error?.message
                        ?? 'Az időszak ütközik egy meglévő foglalással.'
                    );

                } else {

                    this.showNotification(
                        'Hiba történt a szabadidő mentése során.'
                    );

                }

            }

        });

    }

    closeBlockedModal(): void {

        this.showBlockedModal.set(
            false
        );

        this.selectedBlockedTime.set(
            null
        );

    }

    deleteBlockedTime(): void {

        const blocked =
            this.selectedBlockedTime();


        if (!blocked) {
            return;
        }


        const confirmed =
            confirm(
                'Biztosan törölni szeretnéd ezt a szabadidő sávot?'
            );


        if (!confirmed) {
            return;
        }


        this.blockedLoading.set(
            true
        );


        this.bookingService
            .deleteBlockedTime(
                blocked.id
            )
            .subscribe({

                next: () => {

                    this.blockedLoading.set(
                        false
                    );

                    this.closeBlockedModal();

                    this.loadBlockedTimes();

                },

                error: error => {

                    console.error(
                        'Blocked time deletion failed:',
                        error
                    );

                    this.blockedLoading.set(
                        false
                    );

                    this.showNotification(
                        'Nem sikerült törölni a szabadidő sávot.'
                    );

                }

            });

    }

    selectAdminService(
        optionId: string
    ): void {

        this.adminSelectedServiceOptionId.set(
            optionId
        );

        this.adminSelectedDate.set('');
        this.adminSelectedSlot.set('');
        this.adminAvailableSlots.set([]);

    }

    createAdminBooking(): void {

        this.adminBookingError.set('');

        if (
            !this.adminCustomerName().trim() ||
            !this.adminCustomerEmail().trim() ||
            !this.adminSelectedServiceOptionId() ||
            !this.adminSelectedDate() ||
            !this.adminSelectedSlot()
        ) {

            this.adminBookingError.set(
                'Kérlek tölts ki minden kötelező mezőt.'
            );

            return;
        }

        this.adminBookingLoading.set(true);

        const booking = {

            customer_name:
                this.adminCustomerName().trim(),

            customer_email:
                this.adminCustomerEmail().trim(),

            customer_phone:
                this.adminCustomerPhone().trim(),

            service_option_id:
                this.adminSelectedServiceOptionId(),

            booking_date:
                this.adminSelectedDate(),

            start_time:
                this.adminSelectedSlot(),

            send_confirmation_email:
                this.adminSendEmail()

        };

        this.bookingService
            .createAdminBooking(booking)
            .subscribe({

                next: () => {

                    this.adminBookingLoading.set(false);

                    this.showCreateBookingModal.set(
                        false
                    );

                    this.loadBookings();

                    this.loadDashboardStats();

                },

                error: error => {

                    console.error(
                        'Admin booking failed:',
                        error
                    );

                    this.adminBookingLoading.set(false);

                    if (error.status === 409) {

                        this.adminBookingError.set(
                            'Ez az időpont időközben már foglalt.'
                        );

                    } else {

                        this.adminBookingError.set(
                            'A foglalás létrehozása sikertelen.'
                        );

                    }

                }

            });
    }

    loadAdminSlots(): void {

        const optionId =
            this.adminSelectedServiceOptionId();

        const date =
            this.adminSelectedDate();

        if (!optionId || !date) {

            this.adminAvailableSlots.set([]);

            return;
        }

        this.adminSelectedSlot.set('');

        this.bookingService
            .getSlots(
                date,
                optionId
            )
            .subscribe({

                next: slots => {

                    this.adminAvailableSlots.set(
                        slots
                    );

                },

                error: error => {

                    console.error(
                        'Admin slots loading failed:',
                        error
                    );

                    this.adminAvailableSlots.set([]);

                }

            });
    }

    private updateCalendarEvents(
        bookings: Booking[]
    ): void {

        const bookingEvents =
            bookings.map(booking => ({

                id: booking.id,

                title: booking.customerName,

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

                textColor: '#fff',

                editable: false,

                extendedProps: {

                    type: 'booking',

                    serviceName:
                        booking.serviceName,

                    duration:
                        this.getDuration(
                            booking
                        )

                }

            }));


        const blockedEvents =
            this.blockedTimes().map(blocked => ({

                id:
                    `blocked-${blocked.id}`,

                title:
                    blocked.title,

                start:
                    `${blocked.booking_date}T${blocked.start_time}`,

                end:
                    `${blocked.booking_date}T${blocked.end_time}`,

                backgroundColor:
                    '#777',

                borderColor:
                    '#666',

                textColor:
                    '#fff',

                editable: true,

                extendedProps: {

                    type: 'blocked',

                    blockedTimeId:
                        blocked.id

                }

            }));


        const events = [
            ...bookingEvents,
            ...blockedEvents
        ];


        this.calendarOptions.update(
            options => ({

                ...options,

                events

            })
        );

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

    private formatCalendarDate(
        date: Date
    ): string {

        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, '0');

        const day =
            String(
                date.getDate()
            ).padStart(2, '0');


        return `${year}-${month}-${day}`;
    }

    private formatCalendarTime(
        date: Date
    ): string {

        const hours =
            String(
                date.getHours()
            ).padStart(2, '0');

        const minutes =
            String(
                date.getMinutes()
            ).padStart(2, '0');


        return `${hours}:${minutes}`;
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

            case 'Svédmasszázs':
                return '#5FAF8F'; // zsályás zöld

            case 'Prémium masszázs':
                return '#C47A5A'; // meleg terrakotta

            default:
                return '#95A5A6';
        }
    }

    private showNotification(
        message: string,
        type: 'success' | 'error' = 'error'
    ): void {

        this.notification.set({
            type,
            message
        });

        if (this.notificationTimer) {
            clearTimeout(this.notificationTimer);
        }

        this.notificationTimer =
            setTimeout(() => {

                this.notification.set(null);

            }, 4000);
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