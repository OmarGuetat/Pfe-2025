import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LeaveService } from '../../services/leave.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-request-card',
  imports:[CommonModule,FormsModule],
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.css']
})
export class RequestCardComponent {
  @Input() request: any;
  selectedLeave: any = {};


  constructor(private leaveService: LeaveService) {}

  getStatusClass(status: string) {
    return status === 'Approved' ? 'status-approved' :
           status === 'Pending' ? 'status-pending' :
           status === 'Rejected' ? 'status-rejected' : '';
  }

  getLeaveDays(): number {
    return this.request.reason === 'sick_leave' 
      ? this.request.effective_leave_days 
      : this.request.leave_days_requested;
  }
  // Open Update Modal with current leave details
  openUpdateModal(leave: any): void {
    this.selectedLeave = { ...leave };  // Clone the leave object
    const updateModal = new bootstrap.Modal(document.getElementById('updateLeaveModal'));
    updateModal.show();
  }

  // Open Delete Modal
  openDeleteModal(leaveId: number): void {
    console.log('Opening delete modal for Leave ID:', leaveId); // Debugging
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteLeaveModal'));
    deleteModal.show();
  }
  

  // Handle file change event for attachment
  onFileChange(event: any): void {
    this.selectedLeave.attachment = event.target.files[0];
  }

  // Update Leave Request
  updateLeave(): void {
    const formData = new FormData();
    formData.append('start_date', this.selectedLeave.start_date);
    formData.append('end_date', this.selectedLeave.end_date);
    formData.append('reason', this.selectedLeave.reason);
    if (this.selectedLeave.attachment) {
      formData.append('attachment_path', this.selectedLeave.attachment, this.selectedLeave.attachment.name);
    }

    this.leaveService.updateLeave(this.selectedLeave.id, formData).subscribe(
      response => {
        alert('Leave updated successfully!');
        location.reload();  // Refresh page to see the updated data
      },
      error => {
        alert('Error updating leave: ' + error.message);
      }
    );
  }

  // Delete Leave Request
  deleteLeave(leaveId: number): void {
  
    console.log('Deleting Leave ID:', leaveId); // Debugging
  
    this.leaveService.deleteLeave(leaveId).subscribe(
      response => {
        alert(response.message);
        location.reload();
      },
      error => {
        const errorMessage = error.error?.message || error.error?.error || 'Error deleting leave.';
        alert(errorMessage);
      }
    );
  }
  
}