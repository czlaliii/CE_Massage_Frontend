import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { BookingService, Service } from '../../services/booking.service';
import flatpickr from 'flatpickr';
import { Hungarian } from 'flatpickr/dist/l10n/hu.js';
import { RouterLink } from '@angular/router';

import {
    AfterViewInit,
    ElementRef,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'app-booking',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './booking.html',
    styleUrl: './booking.css'
})
export class BookingComponent implements OnInit, AfterViewInit {

    @ViewChild('datePicker')
    datePicker!: ElementRef<HTMLInputElement>;
    private calendar!: flatpickr.Instance;

    acceptedTerms = signal(false);

    errors = signal({
        customerName: '',
        customerEmail: '',
        billingZip: '',
        billingCity: '',
        billingAddress: '',
        general: ''
    });

    loadingServices = signal(true);
    loadingDates = signal(false);
    loadingSlots = signal(false);
    noSlotsMessage = signal('');

    private validateForm(): boolean {

        this.errors.set({
            customerName: '',
            customerEmail: '',
            billingZip: '',
            billingCity: '',
            billingAddress: '',
            general: ''
        });

        let valid = true;

        if (!this.customerName().trim()) {
            this.errors.update(e => ({
                ...e,
                customerName: 'A név megadása kötelező.'
            }));
            valid = false;
        }

        if (!this.customerEmail().trim()) {
            this.errors.update(e => ({
                ...e,
                customerEmail: 'Az email cím megadása kötelező.'
            }));
            valid = false;
        } else {

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(this.customerEmail())) {

                this.errors.update(e => ({
                    ...e,
                    customerEmail: 'Érvényes email címet adj meg.'
                }));

                valid = false;
            }
        }

        // if (!this.billingZip().trim()) {

        //     this.errors.update(e => ({
        //         ...e,
        //         billingZip: 'Az irányítószám kötelező.'
        //     }));

        //     valid = false;

        // } else if (!/^\d{4}$/.test(this.billingZip())) {

        //     this.errors.update(e => ({
        //         ...e,
        //         billingZip: '4 számjegyű irányítószámot adj meg.'
        //     }));

        //     valid = false;
        // }

        // if (!this.billingCity().trim()) {

        //     this.errors.update(e => ({
        //         ...e,
        //         billingCity: 'A város megadása kötelező.'
        //     }));

        //     valid = false;
        // }

        // if (!this.billingAddress().trim()) {

        //     this.errors.update(e => ({
        //         ...e,
        //         billingAddress: 'A cím megadása kötelező.'
        //     }));

        //     valid = false;
        // }

        return valid;

    }

    hasServiceSelected(): boolean {

        return this.selectedService() !== null;

    }

    hasDurationSelected(): boolean {

        return !!this.selectedServiceOptionId();

    }

    hasTimeSelected(): boolean {

        return !!this.selectedSlot();

    }

    hasCustomerDataStarted(): boolean {

        return !!this.customerName().trim()
            || !!this.customerEmail().trim();

    }

  ngAfterViewInit(): void {

    this.calendar = flatpickr(
        this.datePicker.nativeElement,
        {

            inline: true,

            locale: Hungarian,

            dateFormat: "Y-m-d",

            minDate: "today",

            disableMobile: true,

            monthSelectorType: "static",

            onChange: (selectedDates, dateStr) => {

                this.selectedDate.set(dateStr);

                this.loadSlots();

            },

        }

    );

  }

    private bookingService = inject(BookingService);

    services = signal<Service[]>([]);
    availableSlots = signal<string[]>([]);
    availableDates = signal<string[]>([]);
    selectedServiceOptionId = signal('');
    selectedService = signal<Service | null>(null);
    selectedDate = signal('');
    selectedSlot = signal('');
    bookingSuccess = signal(false);
    customerName = signal('');
    customerEmail = signal('');
    customerPhone = signal('');
    billingZip = signal('');
    billingCity = signal('');
    billingAddress = signal('');

    loading = signal(false);

    currentStep = computed(() => {

        if (!this.selectedService())
            return 1;

        if (!this.selectedServiceOptionId())
            return 2;

        if (!this.selectedSlot())
            return 3;

        return 4;

    });

    currentStepLabel = computed(() => {

        switch (this.currentStep()) {

            case 1:
                return 'Masszázs kiválasztása';

            case 2:
                return 'Időtartam kiválasztása';

            case 3:
                return 'Időpont kiválasztása';

            default:
                return 'Személyes adatok';

        }

    });

    formatPrice(price: number): string {
        return new Intl.NumberFormat(
            'hu-HU'
        ).format(price);
    }

    ngOnInit(): void {
        this.bookingService
            .getServices()
            .subscribe({

                next: services => {

                    this.services.set(services);
                    this.loadingServices.set(false);

                },

                error: error => {

                    console.error(
                        'Services loading failed:',
                        error
                    );

                    this.loadingServices.set(false);

                }

            });

    }

    isToday(): boolean {

        const today =
            new Date()
                .toISOString()
                .split('T')[0];

        return this.selectedDate() === today;
    }

    loadSlots(): void {

        if (
            !this.selectedServiceOptionId() ||
            !this.selectedDate()
        ) {
            this.availableSlots.set([]);
            this.noSlotsMessage.set('');
            return;
        }

        this.loadingSlots.set(true);
        this.noSlotsMessage.set('');

        this.bookingService
            .getSlots(
                this.selectedDate(),
                this.selectedServiceOptionId()
            )
            .subscribe({

            next: slots => {

                this.availableSlots.set(slots);

                if (
                    this.selectedSlot() &&
                    !slots.includes(this.selectedSlot())
                ) {
                    this.selectedSlot.set('');
                }

                this.loadingSlots.set(false);

                if (slots.length === 0) {
                    this.noSlotsMessage.set(
                        this.isToday()
                            ? 'Mára már minden időpont betelt. Kérlek, válassz egy másik napot.'
                            : 'Erre a napra jelenleg nincs szabad időpont. Kérlek, válassz egy másik napot.'
                    );
                }
            },

            error: error => {

                console.error(
                    'Slots loading failed:',
                    error
                );

                this.availableSlots.set([]);
                this.loadingSlots.set(false);

                this.noSlotsMessage.set(
                    'Nem sikerült betölteni az elérhető időpontokat. Kérlek, próbáld újra.'
                );
            }
        });
    }

    createBooking(): void {
        if (!this.validateForm()) {

            document
                .querySelector('.field-error')
                ?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

            return;

        }

        this.loading.set(true);

        const booking = {

        customer_name:
            this.customerName(),

        customer_email:
            this.customerEmail(),

        customer_phone:
            this.customerPhone(),

        // billing_name:
        //     this.customerName(),

        // billing_zip:
        //     this.billingZip(),

        // billing_city:
        //     this.billingCity(),

        // billing_address:
        //     this.billingAddress(),

        service_option_id:
            this.selectedServiceOptionId(),

        booking_date:
            this.selectedDate(),

        start_time:
            this.selectedSlot()
    };

        this.bookingService
        .createBooking(booking)
        .subscribe({

            next: (response: any) => {

            // window.location.href =
            //     response.paymentUrl;
            // }

            this.loading.set(false);
            this.bookingSuccess.set(true);
            },

            error: error => {

            console.error(error);

            this.errors.update(e => ({
                ...e,
                general:
                    error.status === 409
                    ? 'Ez az időpont időközben már foglalt. Kérjük válassz másikat.'
                    : 'Váratlan hiba történt. Kérjük próbáld újra.'
            }));

            this.loading.set(false);
            }
        });
    }

    selectService(
        service: Service
    ) {

        this.selectedService.set(service);

        this.selectedServiceOptionId.set('');

        this.selectedDate.set('');

        this.selectedSlot.set('');

        this.availableDates.set([]);

        this.availableSlots.set([]);

        this.calendar.changeMonth(0);

        if (
            service.service_options.length === 1
        ) {

            this.selectOption(
                service.service_options[0].id
            );

        }

    }

    selectOption(optionId: string) {

    const start = performance.now();

    this.selectedServiceOptionId.set(optionId);

    this.selectedDate.set('');
    this.selectedSlot.set('');
    this.availableSlots.set([]);

    this.loadingDates.set(true);

    this.bookingService
        .getAvailableDates(optionId)
        .subscribe({

            next: dates => {

                this.availableDates.set(dates);

                this.calendar.set(
                    'enable',
                    dates
                );

                this.loadingDates.set(false);

                if (dates.length === 0) {
                    return;
                }

                const firstAvailableDate = dates[0];

                this.selectedDate.set(
                    firstAvailableDate
                );

                this.calendar.setDate(
                    firstAvailableDate,
                    true
                );

                this.loadSlots();
            },

            error: error => {

                console.error(
                    'Available dates loading failed:',
                    error
                );

                this.loadingDates.set(false);
            }

        });
}

    minDate = new Date()
        .toISOString()
        .split('T')[0];
}