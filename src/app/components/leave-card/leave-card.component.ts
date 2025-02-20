import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-leave-card',
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './leave-card.component.html',
  styleUrls: ['./leave-card.component.css']
})
export class LeaveCardComponent {
  @Input() leaveEmployee: any;
  @Output() onSeeDetails = new EventEmitter<number>();
  @Output() onViewRequests = new EventEmitter<number>();
  leaveForm: FormGroup;
  submitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private leaveService: LeaveService) {
    this.leaveForm = this.fb.group({
      leave_day_limit: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.maxLength(255)]]
    });
  }

  seeDetails() {
    this.onSeeDetails.emit(this.leaveEmployee.id); 
  }
  viewRequests() {
    this.onViewRequests.emit(this.leaveEmployee.id);
  }
  addLeaveDays() {
    const modal = new bootstrap.Modal(document.getElementById('leaveModal-' + this.leaveEmployee.id)!);
    modal.show();
  }

  submitLeave() {
    if (this.leaveForm.invalid) return;

    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.leaveService.addLeaveDays(this.leaveEmployee.id, this.leaveForm.value)
      .subscribe({
        next: (response) => {
          this.successMessage = response.message;
          this.leaveForm.reset();
          this.submitting = false;
          setTimeout(() => {
            document.getElementById('closeModal-' + this.leaveEmployee.id)?.click();
          }, 1500);
        },
        error: (err) => {
          this.errorMessage = err.error?.error || 'An error occurred.';
          this.submitting = false;
        }
      });
  }
}