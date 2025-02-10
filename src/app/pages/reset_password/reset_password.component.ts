import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports :[ReactiveFormsModule,CommonModule],
  templateUrl: './reset_password.component.html',
  styleUrls: ['./reset_password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string | null = null;
  message: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.resetPasswordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordsMatch }
    );
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    console.log('Token:', this.token);
  }
  
  

  passwordsMatch(formGroup: FormGroup) {
    const password = formGroup.get('newPassword');
    const confirmPassword = formGroup.get('confirmPassword');
  
    if (confirmPassword?.errors && !confirmPassword.errors['passwordMismatch']) {
      return; // Skip if other validation errors exist
    }
  
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const { newPassword, confirmPassword } = this.resetPasswordForm.value; 
      console.log('Form Values:', this.resetPasswordForm.value);  
      
      if (newPassword === confirmPassword) {
        this.authService.resetPassword(this.token, newPassword).subscribe(
          response => {
            this.message = response.message;
            this.errorMessage = null;
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          },
          error => {
            console.error(error);
            this.errorMessage = error.error?.error || 'An error occurred. Please try again.';
            this.message = null;
          }
        );
      } else {
        this.errorMessage = 'Password confirmation does not match.';
      }
    }
  }
}