import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    if (isAuthenticated) {
      // Redirect to home page for authenticated users trying to access login or reset_password
      if (route.routeConfig?.path === 'login' || route.routeConfig?.path === 'reset-password') {
        this.router.navigate(['/admin-home']);
        return false;
      }
    }
    // If not authenticated, allow access to the route 
    return true;
  }
}

