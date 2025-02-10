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
      // Allow access to reset_password for authenticated users
      if (route.routeConfig?.path === 'login' || route.routeConfig?.path === 'reset_password') {
        return true;
      }
      
      // Redirect to home page for authenticated users trying to access login or reset_password
      if (route.routeConfig?.path === 'login') {
        this.router.navigate(['/admin/home']);
        return false;
      }
      
      if (route.routeConfig?.path === 'reset_password') {
        this.router.navigate(['/admin/home']);
        return false;
      }
    }

    // If not authenticated, allow access to the route (like login or reset_password)
    return true;
  }
}

