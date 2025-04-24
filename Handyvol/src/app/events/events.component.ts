import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Импортируем CommonModule
import { EventService } from '../events/event.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule], // Добавляем CommonModule
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent {
  events: any[] = [];
  errorMessage: string | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load events. Please try again later.';
        console.error('Error fetching events:', error);
      },
    });
  }
}
