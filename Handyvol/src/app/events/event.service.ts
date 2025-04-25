import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  created_by: number;
  category?: string;
}

export interface EventCreate {
  name: string;
  date: string;
  location: string;
  description: string;
  category?: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:8000/api/events/';  // URL с завершающим слэшем

  constructor(private http: HttpClient) {}

  // Получить все события
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl, { headers: this.createHeaders() });
  }

  // Получить одно событие по ID
  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}${id}/`, { headers: this.createHeaders() });
  }

  // Добавить событие
  addEvent(event: EventCreate): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event, { headers: this.createHeaders() });
  }

  // Обновить событие
  updateEvent(id: number, event: EventCreate): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}${id}/`, event, { headers: this.createHeaders() });
  }

  // Удалить событие
  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`, { headers: this.createHeaders() });
  }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Authorization token missing');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
  
}
