import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-request-dashboard',
  imports: [CommonModule,FormsModule],
  templateUrl: './request-dashboard.component.html',
  styleUrl: './request-dashboard.component.css'
})
export class RequestDashboardComponent {
  @Input() userId: number | null = null;
  @Output() backToList = new EventEmitter<void>();

  leaveRequests: any[] = [];
  availableYears: number[] = [];
  selectedYear: number | null = null;
  totalLeaveDays: number = 0;
  employeeName: string = "";
  
  // Pagination
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private leaveService: LeaveService) {}

  ngOnInit() {
    if (this.userId) {
      this.fetchLeaveRequests();
    }
  }

  fetchLeaveRequests(): void {
    if (this.userId === null) 
    this.leaveService.getLeaveRequests(Number(this.userId), this.selectedYear ?? undefined, this.currentPage)
      .subscribe((response: {
        full_name: string;
        available_years: number[];
        total_leave_days: number;
        data: {
          id: number;
          start_date: string;
          end_date: string;
          reason: string;
          other_reason?: string;
          leave_days_requested: number;
          effective_leave_days: number;
          status: string;
        }[];
        meta: {
          current_page: number;
          per_page: number;
          total_pages: number;
          total_leaves: number;
        };
      }) => {
        this.leaveRequests = response.data;
        this.availableYears = response.available_years;
        this.totalLeaveDays = response.total_leave_days;
        this.employeeName = response.full_name;
        this.currentPage = response.meta.current_page;
        this.totalPages = response.meta.total_pages;
      });
  }
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchLeaveRequests();
    }
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchLeaveRequests();
    }
  }
  

  onYearChange() {
    this.currentPage = 1; // Reset to first page when year changes
    this.fetchLeaveRequests();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchLeaveRequests();
    }
  }

  goBack() {
    this.backToList.emit();
  }
}
