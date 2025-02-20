import { Component } from '@angular/core';
import { ListComponent } from "../../components/list-component/list-component.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave-dashboard',
  imports: [ListComponent,FormsModule],
  templateUrl: './leave-dashboard.component.html',
  styleUrls: ['./leave-dashboard.component.css']
})
export class LeaveDashboardComponent {
  searchQuery: string = ''; 

  searchEmployees(): void {
  }
}
