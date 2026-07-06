import { Component, inject, OnInit, signal } from '@angular/core';
import { BookingService, Service } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class BookingComponent implements OnInit {

  private bookingService = inject(BookingService);

  services = signal<Service[]>([]);
  availableSlots = signal<string[]>([]);

  selectedServiceId = signal('');
  selectedDate = signal('');
  selectedSlot = signal('');
  bookingSuccess = signal(false);
  customerName = signal('');
  customerEmail = signal('');
  customerPhone = signal('');
  billingName = signal('');
  billingZip = signal('');
  billingCity = signal('');
  billingAddress = signal('');

  loading = signal(false);

  ngOnInit(): void {
    this.bookingService
      .getServices()
      .subscribe(services => {
        this.services.set(services);
      });
  }

  loadSlots(): void {

    if (
      !this.selectedServiceId() ||
      !this.selectedDate()
    ) {
      this.availableSlots.set([]);
      return;
    }

    this.bookingService
      .getSlots(
        this.selectedDate(),
        this.selectedServiceId()
      )
      .subscribe(slots => {

        this.availableSlots.set(slots);

        if (
          this.selectedSlot() &&
          !slots.includes(this.selectedSlot())
        ) {
          this.selectedSlot.set('');
        }
      });
  }

  createBooking(): void {
    if (
      !this.selectedServiceId() ||
      !this.selectedDate() ||
      !this.selectedSlot() ||
      !this.customerName() ||
      !this.customerEmail() ||
      !this.billingName() ||
      !this.billingZip() ||
      !this.billingCity() ||
      !this.billingAddress()
    ) {
      alert('Kérlek tölts ki minden kötelező mezőt.');
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

      billing_name:
          this.billingName(),

      billing_zip:
          this.billingZip(),

      billing_city:
          this.billingCity(),

      billing_address:
          this.billingAddress(),

      service_id:
          this.selectedServiceId(),

      booking_date:
          this.selectedDate(),

      start_time:
          this.selectedSlot()
  };
  console.log('BOOKING:', booking);

    this.bookingService
      .createBooking(booking)
      .subscribe({

        next: (response: any) => {

          window.location.href =
            response.paymentUrl;
        },

        error: error => {

          console.error(error);

          alert(
            error.status === 409
              ? 'Ez az időpont már foglalt.'
              : 'Hiba történt a foglalás során.'
          );

          this.loading.set(false);
        }
      });
  }
  
  minDate = new Date()
    .toISOString()
    .split('T')[0];
}