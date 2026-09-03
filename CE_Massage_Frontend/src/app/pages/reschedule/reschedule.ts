import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import {
  BookingService
} from '../../services/booking.service';

@Component({
  selector: 'app-reschedule',
  standalone: true,
  templateUrl: './reschedule.html',
  styleUrl: './reschedule.css'
})
export class Reschedule
implements OnInit {

  private route =
    inject(ActivatedRoute);

  private bookingService =
    inject(BookingService);

  errorMessage =
    signal('');

  token =
    signal('');

  booking =
    signal<any | null>(null);

  selectedDate =
    signal('');

  selectedSlot =
    signal('');

  availableSlots =
    signal<string[]>([]);

  loading =
    signal(false);

  success =
    signal(false);

  ngOnInit(): void {

    const token =
      this.route.snapshot
        .paramMap
        .get('token');

    if (!token) {
      return;
    }

    this.token.set(token);

    this.bookingService
      .getBookingByToken(token)
      .subscribe(booking => {

        this.booking.set(
          booking
        );

      });
  }

  loadSlots(): void {

    const booking =
      this.booking();

    if (
      !booking ||
      !this.selectedDate()
    ) {
      return;
    }

    this.availableSlots.set([]);

    this.selectedSlot.set('');

    this.errorMessage.set('');

    this.bookingService
      .getSlots(
        this.selectedDate(),
        booking.serviceOptionId
      )
      .subscribe({

        next: slots => {

          this.availableSlots.set(
            slots
          );

        },

        error: error => {

          console.error(
            'Időpontok lekérése sikertelen:',
            error
          );

          this.availableSlots.set([]);

          this.selectedSlot.set('');

          this.errorMessage.set(
            error?.error?.message ??
            'Az elérhető időpontok betöltése sikertelen.'
          );

        }

      });
  }

  submit(): void {

    if (
      !this.selectedDate() ||
      !this.selectedSlot()
    ) {
      return;
    }

    this.loading.set(true);

    this.bookingService
      .rescheduleBooking(
        this.token(),
        this.selectedDate(),
        this.selectedSlot()
      )
      .subscribe({

        next: () => {

          this.errorMessage.set('');

          this.success.set(
            true
          );

          this.loading.set(
            false
          );
        },

        error: error => {

            this.errorMessage.set(
                error.error.message
            );

            this.loading.set(
                false
            );
        }
      });
  }

  minDate = (() => {

    const today = new Date();

    const year =
      today.getFullYear();

    const month =
      String(today.getMonth() + 1)
        .padStart(2, '0');

    const day =
      String(today.getDate())
        .padStart(2, '0');

    return `${year}-${month}-${day}`;

  })();
}