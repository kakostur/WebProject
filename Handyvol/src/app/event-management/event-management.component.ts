import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-event-management',
  standalone: true,  
  imports: [CommonModule, FormsModule], 
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent {
  event = {
    name: '',
    date: '',
    description: '',
    location: '',
    category: ''
  };
  
  events: Array<any> = [];

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']); 
  }

  onSubmit() {
    this.events.push({ ...this.event });
    this.event = { name: '', date: '', description: '', location: '', category: '' };  
  }

  editEvent(index: number) {
    const eventToEdit = this.events[index];
    this.event = { ...eventToEdit };  
    this.events.splice(index, 1);  
  }

  deleteEvent(index: number) {
    this.events.splice(index, 1);
  }
}
