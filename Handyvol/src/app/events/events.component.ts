///events/events.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from './event.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: any[] = [];
  errorMessage: string | null = null;
  loading = false;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.errorMessage = null;
    
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.loading = false;
        this.events = events.map(event => ({
          ...event,
          formattedDate: this.formatEventDate(event.date)
        }));
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to load events. Please try again later.';
        console.error('Error fetching events:', error);
      },
    });
  }

  formatEventDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    } catch (e) {
      return dateString; 
    }
  }
}