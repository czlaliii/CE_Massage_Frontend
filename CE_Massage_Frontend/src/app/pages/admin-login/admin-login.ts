import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {
private authService = inject(AuthService);
  private router = inject(Router);

  username = signal('');
  password = signal('');

  errorMessage = signal('');
  loading = signal(false);

  login(): void {

    this.errorMessage.set('');
    this.loading.set(true);

    this.authService
      .login(
        this.username(),
        this.password()
      )
      .subscribe({

        next: response => {

          this.authService
            .saveToken(
              response.token
            );

          this.loading.set(false);

          this.router.navigate([
            '/admin/bookings'
          ]);
        },

        error: () => {

          this.loading.set(false);

          this.errorMessage.set(
            'Hibás felhasználónév vagy jelszó.'
          );
        }
      });
  }
}
