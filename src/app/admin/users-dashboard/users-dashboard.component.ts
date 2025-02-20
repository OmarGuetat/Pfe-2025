import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ListComponent } from '../../components/list-component/list-component.component';

import { CandidateService } from '../../services/condidate.service';



@Component({
  selector: 'app-users-dashboard',
  imports: [CommonModule, ListComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {
  candidateForm!: FormGroup;
  alertMessage: string = '';
  alertType: string = '';
  searchQuery: string = '';
  showPassword: boolean = false;
  constructor(private formBuilder: FormBuilder, private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.candidateForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['male', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      company: ['procan', Validators.required],
      start_date: [this.getTodayDate(), Validators.required],
      role: ['employee', Validators.required],
      job_description: ['', [Validators.required, Validators.maxLength(15)]],
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; 
  }
  openModal() {
    const modal = new window.bootstrap.Modal(document.getElementById('addCandidateModal'));
    modal.show();
  }
  dismissAlert() {
    this.alertMessage = '';
  }

  onSubmit() {
    if (this.candidateForm.valid) {
      this.candidateService.addCandidate(this.candidateForm.value).subscribe(
        response => {
          this.alertMessage = response.message || 'candidate added successfully';
          this.alertType = 'alert-success';

          setTimeout(() => {
            this.dismissAlert();
            location.reload();
          }, (500));
        },
        error => {
          if (error.error) {
            const errors = error.error;
            const firstErrorKey = Object.keys(errors)[0];
            this.alertMessage = errors[firstErrorKey][0];
          } else {
            this.alertMessage = 'Error adding candidate';
          }
          this.alertType = 'alert-danger';
        }
      );
    }
  }
  closeModal() {
    const modal = new window.bootstrap.Modal(document.getElementById('addCandidateModal'));
    modal.hide();
  }
  performSearch(): void {
    this.searchQuery = this.searchQuery.trim(); // Remove extra spaces
  }
}
