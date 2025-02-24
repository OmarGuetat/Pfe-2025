import {Component, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { AdminHomeComponent } from '../../admin/admin-home/admin-home.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UsersDashboardComponent } from '../../admin/users-dashboard/users-dashboard.component';
import { LeaveDashboardComponent } from '../../admin/leave-dashboard/leave-dashboard.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, MatButtonModule,CommonModule, FormsModule, ReactiveFormsModule, SidebarComponent, UsersDashboardComponent, LeaveDashboardComponent, FooterComponent,SidebarComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  constructor() {}
  menuItems = [
    { label: 'Users Dashboard', component: 'users-dashboard', icon: 'bi-people' },
    { label: 'Leave Dashboard', component: 'leave-dashboard', icon: 'bi-calendar-check' }
  ];
  activeComponent = 'Leave Dashboard'; 
  ngOnInit() {
    // Retrieve the last active component from localStorage
    const savedComponent = localStorage.getItem('activeComponent');
  
    if (savedComponent) {
      this.activeComponent = savedComponent;
    } else {
      // Default to Users Dashboard if nothing is saved
      this.activeComponent = 'users-dashboard';
      localStorage.setItem('activeComponent', 'users-dashboard');
    }
  }
  

  loadComponent(componentName: string) {
    this.activeComponent = componentName;
    // Save the selected component in localStorage
    localStorage.setItem('activeComponent', componentName);
  }
  @ViewChild('sidenav') sidenav!: MatSidenav;

  

  close(reason: string) {
   
    this.sidenav.close();
  }


}
