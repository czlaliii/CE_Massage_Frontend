import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private http = inject(HttpClient);

    private apiUrl =
        'http://localhost:3000';

    login(
        username: string,
        password: string
    ) {

        return this.http.post<{
        token: string;
        }>(
        `${this.apiUrl}/auth/login`,
        {
            username,
            password
        }
        );
    }

    saveToken(
        token: string
    ) {

        localStorage.setItem(
        'admin_token',
        token
        );
    }

    getToken() {

        return localStorage.getItem(
        'admin_token'
        );
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem(
            'admin_token'
        );
    }

    logout() {

        localStorage.removeItem(
        'admin_token'
        );
    }
}