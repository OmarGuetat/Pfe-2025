import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee-service.service';



@Component({
  selector: 'app-employee-card',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css'
})
export class EmployeeCardComponent {
  @Input() employee: any;
  isFlipped: boolean = false;
  isClicked = false;
  updateForm: FormGroup;
  companies = ['procan', 'adequat'];
  roles = ['hr', 'employe'];
  showSuccessAlert = false;
  errorMessage: string = '';
  showDeleteAlert = false;
  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
  deleteEmployee() {
    console.log('Delete function here!');
  }
  animateClick() {
    this.isClicked = true;
    setTimeout(() => {
      this.isClicked = false; 
    }, 300);
}
constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
  this.updateForm = this.fb.group({
    username: ['', Validators.required],
    company: ['', Validators.required],
    role: ['', Validators.required]
  });
}

// Fill the form when modal opens
ngOnInit(): void {
  this.updateForm.patchValue({
    username: this.employee.username,
    company: this.employee.company,
    role: this.employee.role
  });
}
dismissAlert() {
  this.errorMessage = '';
}
submitUpdate() {
  if (this.updateForm.valid) {
    const updatedEmployee = {
      username:this.updateForm.value.username,
      company: this.updateForm.value.company,
      role: this.updateForm.value.role
    };

    this.employeeService.updateEmployee(this.employee.id, updatedEmployee).subscribe(
      response => {
        this.showSuccessAlert = true;

        setTimeout(() => {
          this.showSuccessAlert = false;
          location.reload();
        }, 1000);
      },
      error => {
        this.errorMessage = error.error.error || 'Error updating candidate'; 
      }
    );
  }
}
confirmDelete(employeeId: string) {
  this.employeeService.deleteEmployee(employeeId).subscribe(
    response => {
      this.showDeleteAlert = true;

      // Close alert after 2 seconds and refresh page
      setTimeout(() => {
        this.showDeleteAlert = false;
        location.reload();
      }, 1000);
    },
    error => {
      console.error('Error deleting employee:', error);
    }
  );
}
}
