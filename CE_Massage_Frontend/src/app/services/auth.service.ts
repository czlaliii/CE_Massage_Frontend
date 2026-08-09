import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private http = inject(HttpClient);

    private apiUrl = environment.apiUrl;

    login(
        username: string,
        password: string
    ) {

        return this.http.post<{
            token: string;
        }>(
            `${this.apiUrl}/admin/login`,
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