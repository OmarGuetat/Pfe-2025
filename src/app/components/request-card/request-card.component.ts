import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LeaveService } from '../../services/leave.service';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-request-card',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.css']
})
export class RequestCardComponent {
  @Input() request: any;
  alertMessage: string = '';
  alertType: string = '';
  updateForm!: FormGroup;
  selectedLeaveId!: number; 
  isModalOpen: boolean = false;


  constructor(private leaveService: LeaveService) {}

  ngOnInit() {
    this.initializeForm();
  }
  getStatusLabel(status: string): string {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'on_hold':
        return 'Pending';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  }
  
  initializeForm(): void {
    this.updateForm = new FormGroup({
      start_date: new FormControl(''),
      end_date: new FormControl(''),
      reason: new FormControl(''),
      attachment: new FormControl(null),
    });
  }
  dismissAlert() {
    this.alertMessage = '';
  }
  openUpdateModal(request: any): void { 
    
    this.selectedLeaveId = request.id;
    this.updateForm.patchValue({
      start_date: request.start_date,
      end_date: request.end_date,
      reason: request.reason,
    });

    const updateModal = new bootstrap.Modal(document.getElementById('updateLeaveModal')!);
    updateModal.show();
  }

  openDeleteModal(requestId: number): void {
    console.log(this.request.status)
    this.selectedLeaveId = requestId;
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteLeaveModal')!);
    deleteModal.show();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.updateForm.patchValue({ attachment: file });
    }
  }

  updateLeave(LeaveId : number): void {
    
    const formData = new FormData();
    Object.keys(this.updateForm.value).forEach(key => {
      if (this.updateForm.value[key]) {
        formData.append(key, this.updateForm.value[key]);
      }
    });

    this.leaveService.updateLeave(LeaveId, formData).subscribe(
      () => {
        alert('Leave updated successfully!');
      },
      error => alert('Error updating leave: ' + (error.error?.message || error.message))
    );
  }

   // Delete Leave Request
   deleteLeave(LeaveId : number): void {
    
    this.leaveService.deleteLeave(LeaveId).subscribe(
      response => {
        this.alertMessage = response.message || 'Leave Request Deleted Successfully!';
        this.alertType = 'alert-success';
        setTimeout(() => {
          this.dismissAlert();
          location.reload();
        }, 500);
      },
      error => {
        if (error.error) {
          const errors = error.error; 
          const firstErrorKey = Object.keys(errors)[0]; 
        this.alertMessage = errors[firstErrorKey][0]; 
        } else {
          this.alertMessage = 'Error Deleting employee';
        }
        this.alertType = 'alert-danger';
      }
    );
  }
}
