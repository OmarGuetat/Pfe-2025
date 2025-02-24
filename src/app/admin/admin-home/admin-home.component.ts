import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { UsersDashboardComponent } from '../users-dashboard/users-dashboard.component';
import { RouterOutlet } from '@angular/router';
import { LeaveDashboardComponent } from '../leave-dashboard/leave-dashboard.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { SidenavComponent } from '../../components/sidenav/sidenav.component';


@Component({
  selector: 'app-admin-home',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarComponent, UsersDashboardComponent, LeaveDashboardComponent, FooterComponent],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent  {
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
}
