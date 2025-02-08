import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports :[ReactiveFormsModule,CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.resetPasswordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      },
      {
        validator: this.passwordsMatch('password', 'confirmPassword') 
      }
    );
  }
  passwordsMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(password);
      const confirmControl = formGroup.get(confirmPassword);

      // Only run this validation if both controls are touched and valid
      if (confirmControl?.touched && confirmControl.value) {
        if (control?.value !== confirmControl.value) {
          confirmControl.setErrors({ passwordMismatch: true });
        } else {
          confirmControl.setErrors(null);
        }
      }
    };
  }

  onResetPasswordSubmit(event: Event) {
    event.preventDefault();
    if (this.resetPasswordForm.valid) {
      const { password } = this.resetPasswordForm.value;
      console.log('Password reset successful:', password);
      // call API for password reset
    } else {
      console.log('Form is invalid');
    }
  }
}
