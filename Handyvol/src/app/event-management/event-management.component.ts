import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../events/event.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-management',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css'],
})
export class EventManagementComponent {
  event = {
    name: '',
    date: '',
    description: '',
    location: '',
    category: '',
    photo: null as File | null,
  };

  constructor(private router: Router, private eventService: EventService) {}

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.event.photo = input.files[0];
      console.log('Selected file:', this.event.photo);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    if (!this.event.name || !this.event.date || !this.event.location) {
      alert('Please fill in all required fields.');
      return;
    }

    const eventData: { name: string; date: string; location: string; description?: string; category?: string; photo?: File } = {
      name: this.event.name,
      date: this.event.date,
      location: this.event.location,
      description: this.event.description,
      category: this.event.category,
      photo: this.event.photo || undefined,
    };

    this.eventService.addEvent(eventData).subscribe({
      next: (response: any) => {
        console.log('Event added successfully:', response);
        alert('Event added successfully!');
        this.resetForm();
      },
      error: (error: any) => {
        console.error('Failed to add event:', error);
        alert('Failed to add event.');
      },
    });
  }

  private resetForm(): void {
    this.event = { name: '', date: '', description: '', location: '', category: '', photo: null };
  }
}
