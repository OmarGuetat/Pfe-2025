import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LeaveService } from '../../services/leave.service';
import { CommonModule } from '@angular/common';

interface Leave {
  id: number;
  created_at: string;
  leave_day_limit: number;
  description: string;
}

@Component({
  selector: 'app-leave-details',
  imports: [CommonModule],
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.css']
})
export class LeaveDetailsComponent implements OnInit {
  @Input() userId!: number; // Employee ID passed as input
  @Output() backToList = new EventEmitter<void>(); // Event emitter for going back to the list
  leaveData: Leave[] = []; // Specify the type of leaveData as Leave[]
  currentPage: number = 1; // The current page number
  totalPages: number = 1; // Total number of pages
  totalLeaves: number = 0; // Total number of leaves
  perPage: number = 10; // Leaves per page
  user: { first_name: string; last_name: string } = { first_name: '', last_name: '' };

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.fetchLeaveData();
  }

  fetchLeaveData(): void {
    this.leaveService.getLeaveDetails(this.userId, this.currentPage).subscribe(response => {
      console.log('Leave Data:', response);
      if (response.user && response.data) {
        this.user = response.user; // Set user data here
        this.leaveData = response.data; // Set leave data
        this.totalPages = response.meta.total_pages;
        this.totalLeaves = response.meta.total_leaves;
      }
    }, error => {
      console.error('Error fetching leave details:', error);
    });
  }
  // Method to go to the next page
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchLeaveData();
    }
  }

  // Method to go to the previous page
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchLeaveData();
    }
  }

  // Method to go to a specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchLeaveData();
    }
  }
  cancelLeave(leaveId: number): void {
    this.leaveService.cancelLeave(leaveId).subscribe(response => {
      alert(response.message);
      this.fetchLeaveData(); // Refresh data after cancellation
    }, error => {
      alert('Error canceling leave: ' + error.error?.message);
    });
  }

  // Method to go back to the list
  onBackClick(): void {
    this.backToList.emit();
  }
}
