import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee-service.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() menuClick = new EventEmitter<string>();
  @Input() menuItems: any[] = [];

  avatarPath: string = '';
  fullName: string = 'User';
  isAdmin: boolean = false;
  constructor(private authService: AuthService, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadSidebarData();
  }

  loadSidebarData(): void {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      this.employeeService.getSidebarData().subscribe(response => {
        this.avatarPath = response.avatar_path || '';
        this.fullName = response.full_name || 'User';
      });
    } else {
      this.fullName = 'Admin'; 
      this.isAdmin = true;
    }
  }
  navigateToProfile(): void {
    this.menuClick.emit('profile'); 
  }
  
  logout(): void {
    this.authService.logout();
    localStorage.removeItem('role');
  }

  onMenuClick(componentName: string): void {
    this.menuClick.emit(componentName);
  }
}
