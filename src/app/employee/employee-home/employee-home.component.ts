import { Component } from '@angular/core';
import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProfileComponent } from '../profile/profile.component';
import { RequestsUserDashboardComponent } from '../../components/requests-user-dashboard/requests-user-dashboard.component';



@Component({
  selector: 'app-employee-home',
  imports: [LeaveFormComponent,SidebarComponent,CommonModule, FormsModule, ReactiveFormsModule,FooterComponent,ProfileComponent,RequestsUserDashboardComponent],
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.scss'
})
export class EmployeeHomeComponent {
  constructor() {}
  menuItems = [
    { label: 'Leave Form', component: 'leave-form', icon: 'bi-calendar4-range' },
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
