import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports :[ReactiveFormsModule,CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  @Output() backToLogin = new EventEmitter<void>();

  forgotPasswordForm: FormGroup;
  message: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onForgotPasswordSubmit(event: Event) {
    event.preventDefault();
  
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
  
      this.authService.forgotPassword(email).subscribe(
        (response) => {
          this.message = response.message || 'A password reset link has been sent to your email.';
          this.error = '';
        },
        (error) => {
          this.message = '';
          this.error = error.error.email || 'No user found with this email';
        }
      );
    }
  }
  

  goBackToLogin() {
    this.backToLogin.emit();
  }
}
