import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService, Event as EventModel, EventCreate } from '../events/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-management',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css'],
})
export class EventManagementComponent implements OnInit {
  event: EventModel = {
    id: 0,
    name: '',
    date: '',
    location: '',
    description: '',
    created_by: 0,
    category: '',
  };

  isEditing = false;
  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.isEditing = true;
      this.loadEvent(+eventId); // Загружаем событие для редактирования
    }
  }

  loadEvent(id: number): void {
    this.loading = true;
    this.eventService.getEvent(id).subscribe({
      next: (event) => {
        this.event = { ...event, date: this.formatDateForInput(event.date) };
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading event:', error);
        this.errorMessage = 'Failed to load event details.';
        this.loading = false;
      }
    });
  }

  formatDateForInput(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 16); // Формат для input типа datetime-local
    } catch (e) {
      return '';
    }
  }

  onSubmit(): void {
    console.log('Submitting data:', this.event);  // Логирование данных перед отправкой
    this.loading = true;
    const eventData: EventCreate = { ...this.event };
  
    if (this.isEditing) {
      this.eventService.updateEvent(this.event.id, eventData).subscribe({
        next: () => {
          this.successMessage = 'Event successfully updated!';
          this.redirectToMain('/events');
        },
        error: (error) => {
          console.error('Failed to update event:', error);
          this.errorMessage = `Failed to update event: ${error.message || 'Unknown error'}`;
          this.loading = false;
        }
      });
    } else {
      this.eventService.addEvent(eventData).subscribe({
        next: () => {
          this.successMessage = 'Event successfully added!';
          this.redirectToMain('/events');
        },
        error: (error) => {
          console.error('Failed to add event:', error);
          this.errorMessage = `Failed to add event: ${error.message || 'Unknown error'}`;
          this.loading = false;
        }
      });
    }
  }

  deleteEvent(): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.loading = true;
      this.eventService.deleteEvent(this.event.id).subscribe({
        next: () => {
          this.successMessage = 'Event successfully deleted!';
          this.redirectToMain('/events');
        },
        error: (error) => {
          console.error('Failed to delete event:', error);
          this.errorMessage = `Failed to delete event: ${error.message || 'Unknown error'}`;
          this.loading = false;
        }
      });
    }
  }

  redirectToMain(route: string): void {
    setTimeout(() => this.router.navigate([route]), 1500);
  }

  goBack(): void {
    // Навигация назад на страницу со всеми событиями
    this.router.navigate(['/events']);
  }
}
