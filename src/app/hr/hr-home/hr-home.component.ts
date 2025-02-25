import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';
import { LeaveFormComponent } from '../../employee/leave-form/leave-form.component';
import { ProfileComponent } from '../../employee/profile/profile.component';
import { LeaveDashboardComponent } from '../../admin/leave-dashboard/leave-dashboard.component';
import { UsersDashboardComponent } from '../../admin/users-dashboard/users-dashboard.component';
import { RequestsUserDashboardComponent } from '../../components/requests-user-dashboard/requests-user-dashboard.component';


@Component({
  selector: 'app-hr-home',
   imports: [LeaveFormComponent,SidebarComponent,CommonModule, FormsModule, ReactiveFormsModule,FooterComponent,ProfileComponent,LeaveDashboardComponent,UsersDashboardComponent,RequestsUserDashboardComponent],
  templateUrl: './hr-home.component.html',
  styleUrl: './hr-home.component.css'
})
export class HrHomeComponent {
  constructor() {}
  menuItems = [
    { label: 'Users Dashboard', component: 'users-dashboard', icon: 'bi-people' },
    { label: 'Leave Dashboard', component: 'leave-dashboard', icon: 'bi-calendar-check' },
    { label: 'Leave Form', component: 'leave-form', icon: 'bi-calendar' },
    { label: 'Leave Requests', component: 'user-request-dashboard', icon: 'bi-calendar-check' },
    
  ];
  activeComponent = 'leave-form'; 
  ngOnInit() {
    // Retrieve the last active component from localStorage
    const savedComponent = localStorage.getItem('activeComponent');
  
    if (savedComponent) {
      this.activeComponent = savedComponent;
    } else {
      // Default to Users Dashboard if nothing is saved
      this.activeComponent = 'leave-form';
      localStorage.setItem('activeComponent', 'leave-form');
    }
  }
  

  loadComponent(componentName: string) {
  this.activeComponent = componentName;
  localStorage.setItem('activeComponent', componentName);
}
}
