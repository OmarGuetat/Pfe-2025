import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee-service.service';
import { EmployeeCardComponent } from '../../admin/employee-card/employee-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-component',
  imports: [EmployeeCardComponent, FormsModule, CommonModule],
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css']
})
export class ListComponent implements OnInit,OnChanges {
  @Input() searchQuery: string = '';
  employees: Employee[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  totalEmployees: number = 0;
  perPage: number = 6;
  pages: number[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees(this.currentPage);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchQuery']) {
      this.performSearch();
    }
  }
  // Method to load employees for a given page
  loadEmployees(page: number): void {
    this.employeeService.getEmployees(page).subscribe(response => {
      this.employees = response.data;
      this.currentPage = response.meta.current_page;
      this.totalPages = response.meta.total_pages;
      this.totalEmployees = response.meta.total_employees;

      // Generate the page numbers for pagination
      this.pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
    });
  }
  performSearch(): void {
    this.employeeService.searchEmployees(this.searchQuery).subscribe(response => {
      this.updateEmployeeList(response);
    });
  }
  updateEmployeeList(response: any) {
    this.employees = response.users.data;
    this.currentPage = response.users.current_page;
    this.totalPages = response.users.last_page;
    this.totalEmployees = response.users.total;

    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadEmployees(page);
    }
  }
}
