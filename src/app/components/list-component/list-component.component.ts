import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee-service.service';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
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
  
  loadEmployees(page: number, query: string = ''): void {
    this.employeeService.searchEmployees(query, page).subscribe(response => {
      this.employees = response.data;
      this.currentPage = response.meta.current_page;
      this.totalPages = response.meta.total_pages;
      this.totalEmployees = response.meta.total_employees;
  
      // Generate page numbers
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    });
  }
  
  performSearch(): void {
    this.loadEmployees(1, this.searchQuery); // Start from page 1 when searching
  }
  
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadEmployees(page, this.searchQuery); // Maintain search query on pagination
    }
  }
}
