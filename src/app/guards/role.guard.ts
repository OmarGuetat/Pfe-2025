import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRole = this.authService.getUserRole();
    const allowedRoles = route.data['roles'] as string[];

    if (allowedRoles.includes(userRole)) {
      return true;
    }

    // Redirect unauthorized users
    this.router.navigate(['/login']);
    return false;
  }
}
