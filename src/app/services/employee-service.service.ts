import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Employee {
  id:string;
  first_name: string;
  last_name: string;
  gender:string;
  username:string;
  email: string;
  password:string;
  company: string;
  start_date: string;
  role: string; 
  initial_leave_balance: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://127.0.0.1:8000/api/admin/users';
  constructor(private http: HttpClient) {}

  getEmployees(page: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Include the page query parameter in the request
    return this.http.get<any>(`${this.apiUrl}?page=${page}`, { headers });
  }
  updateEmployee(id: string, employee: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/${id}`, employee, { headers });
  }
  deleteEmployee(id: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
  searchEmployees(query: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`http://127.0.0.1:8000/api/admin/users/search?search=${query}`, { headers });
  }
}
