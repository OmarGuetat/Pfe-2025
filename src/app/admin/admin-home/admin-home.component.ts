import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ListComponent } from '../../components/list-component/list-component.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CandidateService } from '../../services/condidate.service';


@Component({
  selector: 'app-admin-home',
  imports : [CommonModule,ListComponent,FormsModule,NavbarComponent,ReactiveFormsModule],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  candidateForm!: FormGroup;
  showSuccessAlert = false;
  errorMessage: string = '';
  searchQuery: string = '';
  constructor(private formBuilder: FormBuilder, private candidateService: CandidateService) {}

  ngOnInit(): void {
    this.candidateForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      company: ['', Validators.required],
      start_date: ['', Validators.required],
      role: ['', Validators.required],
      initial_leave_balance: [0, Validators.required]
    });
  }

  openModal() {
    const modal = new window.bootstrap.Modal(document.getElementById('addCandidateModal'));
    modal.show();
  }
  dismissAlert() {
    this.errorMessage = '';
  }

  onSubmit() {
    if (this.candidateForm.valid) {
      this.candidateService.addCandidate(this.candidateForm.value).subscribe(
        response => {
          this.showSuccessAlert = true;

        setTimeout(() => {
          this.showSuccessAlert = false;
          location.reload();
        }, 1000);
        },
        error => {
          this.errorMessage = error.error.error || 'Error adding candidate' ; 
        }
      );
    }
  }
  closeModal() {
    const modal = new window.bootstrap.Modal(document.getElementById('addCandidateModal'));
    modal.hide();
  }
  performSearch() {}
}
