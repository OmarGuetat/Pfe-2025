import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports:[CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() menuClick = new EventEmitter<string>();
  @Input() menuItems: any[] = [];

  onMenuClick(componentName: string) {
    this.menuClick.emit(componentName);
  }
}
