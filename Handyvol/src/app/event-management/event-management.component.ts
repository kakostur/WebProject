//event-management/event-management.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../events/event.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-management',
  standalone: true,
  imports: [FormsModule, CommonModule],
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
  
  isSubmitting = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private router: Router, private eventService: EventService) {}

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.event.photo = input.files[0];
      console.log('Selected file:', this.event.photo);
    }
  }

  goBack(): void {
    this.router.navigate(['/events']);
  }

  onSubmit(): void {
    if (!this.event.name || !this.event.date || !this.event.location) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
    
    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;
    
    // Преобразовать дату в ISO формат для передачи на сервер
    let formattedDate: string;
    try {
      // Если пользователь предоставил только дату (без времени)
      if (this.event.date.indexOf('T') === -1) {
        formattedDate = new Date(this.event.date + 'T00:00:00').toISOString();
      } else {
        formattedDate = new Date(this.event.date).toISOString();
      }
    } catch (e) {
      // В случае ошибки используем строку как есть
      formattedDate = this.event.date;
    }

    const eventData = {
      name: this.event.name,
      date: formattedDate,
      location: this.event.location,
      description: this.event.description,
      category: this.event.category,
      photo: this.event.photo || undefined,
    };

    this.eventService.addEvent(eventData).subscribe({
      next: (response: any) => {
        this.isSubmitting = false;
        console.log('Event added successfully:', response);
        this.successMessage = 'Event added successfully!';
        this.resetForm();
      },
      error: (error: any) => {
        this.isSubmitting = false;
        console.error('Failed to add event:', error);
        
        if (error.error && typeof error.error === 'object') {
          let errorMsg = '';
          for (const key in error.error) {
            if (error.error.hasOwnProperty(key)) {
              errorMsg += `${key}: ${error.error[key]}\n`;
            }
          }
          this.errorMessage = errorMsg || 'Failed to add event.';
        } else {
          this.errorMessage = error.error?.detail || 'Failed to add event.';
        }
      },
    });
  }

  private resetForm(): void {
    this.event = { 
      name: '', 
      date: '', 
      description: '', 
      location: '', 
      category: '', 
      photo: null 
    };
  }
}