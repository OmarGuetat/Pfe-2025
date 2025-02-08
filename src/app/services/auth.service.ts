import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //we are testing the api with mocky till the backend is ready
  private apiUrl = 'https://run.mocky.io/v3/2e38089c-303a-4695-ba0c-94816e43cd2d';

  constructor(private http: HttpClient, private router: Router) {}

  login(name: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { name, password }).pipe(
      tap(response => {
        console.log("Login response:", response); // Debugging
        if (response.token && response.role) {
          this.saveToken(response.token);
          localStorage.setItem('userRole', response.role);
        } else {
          console.error("Invalid login response format:", response);
        }
      })
    );
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
