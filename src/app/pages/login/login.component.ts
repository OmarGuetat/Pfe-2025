import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule,ForgotPasswordComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.redirectUser();
    }
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(event?: Event) {
  event?.preventDefault();
  this.errorMessage = ''; // Reset the error message before login attempt

  if (this.loginForm.valid) {
    const { name, password } = this.loginForm.value;

    this.authService.login(name, password).subscribe(
      (response) => {
        this.authService.saveToken(response.access_token);
        localStorage.setItem('userRole', response.role);
        setTimeout(() => this.redirectUser(), 100);
      },
      (error) => {
        this.errorMessage = error.error.error || 'Invalid username or password'; 
      }
    );
  }
}

// Function to dismiss alert manually
dismissAlert() {
  this.errorMessage = '';
}
  redirectUser() {
    const role = this.authService.getUserRole();
    if (role === 'admin') {
      this.router.navigate(['/admin/home']);
    } else if (role === 'employee') {
      this.router.navigate(['/employee/home']);
    }
  }
  getUserRole(): string {
    return localStorage.getItem('userRole') || 'guest';
  }
  
  isForgotPasswordMode = false;

  toggleForgotPassword() {
    this.isForgotPasswordMode = !this.isForgotPasswordMode;
  }
  
}
