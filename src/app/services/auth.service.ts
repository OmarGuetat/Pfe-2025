import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //we are testing the api with mocky till the backend is ready
  private apiUrl = 'http://127.0.0.1:8000/api/auth/login';
  private passwordResetConfirmUrl = 'http://127.0.0.1:8000/api/password/reset';

  constructor(private http: HttpClient, private router: Router) {}

  login(name: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { name, password }).pipe(
      tap(response => {
        console.log("Login response:", response); // Debugging
        if (response.access_token && response.role) {  // Laravel sends `access_token`
          this.saveToken(response.access_token);
          localStorage.setItem('userRole', response.role);
        } else {
          console.error("Invalid login response format:", response);
        }
      })
    );
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/password/email', { email });
  }

  resetPassword(token: string | null, newPassword: string): Observable<any> {
    return this.http.post<any>(this.passwordResetConfirmUrl, { token, new_password: newPassword, confirm_password: newPassword });
  }
  
  getUserRole(): string {
    return localStorage.getItem('userRole') || 'guest';
  }
  
  
  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole'); 
    this.router.navigate(['/login']);
  }
}
