import { Component } from '@angular/core';
import { ListComponent } from "../../components/list-component/list-component.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-dashboard',
  imports: [ListComponent, FormsModule,CommonModule],
  templateUrl: './leave-dashboard.component.html',
  styleUrls: ['./leave-dashboard.component.css']
})
export class LeaveDashboardComponent {
  searchQuery: string = ''; 
  selectedUserId: number | null = null; // Track selected user
  selectedRequestsUserId: number | null = null; // Track selected request user

  searchEmployees(): void {
    // Your search logic here
  }

  // Called when a user is selected from the list
  handleUserSelection(userId: number): void {
    this.selectedUserId = userId;
  }

  // Reset selection (e.g., when going back to the main list)
  resetSelection(): void {
    this.selectedUserId = null;
    this.selectedRequestsUserId = null;
  }
}
