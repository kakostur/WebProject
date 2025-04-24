///events/event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = 'http://localhost:8000/api/events/';
  
  constructor(private http: HttpClient) {}
  
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError(error => {
        console.error('Error fetching events:', error);
        return throwError(() => error);
      })
    );
  }
  
  getEvent(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${id}/`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError(error => {
        console.error(`Error fetching event ${id}:`, error);
        return throwError(() => error);
      })
    );
  }
  
  addEvent(event: { 
    name: string; 
    date: string; 
    location: string; 
    description?: string; 
    category?: string; 
    photo?: File 
  }): Observable<any> {
    const formData = new FormData();
    formData.append('name', event.name);
    formData.append('date', event.date);
    formData.append('location', event.location);
    
    if (event.description) formData.append('description', event.description);
    if (event.category) formData.append('category', event.category);
    if (event.photo) formData.append('photo', event.photo);
    
    return this.http.post(`${this.baseUrl}`, formData, { 
      headers: this.getAuthHeaders(true) 
    }).pipe(
      catchError(error => {
        console.error('Error creating event:', error);
        return throwError(() => error);
      })
    );
  }
  
  registerForEvent(eventId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}${eventId}/register/`, {}, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError(error => {
        console.error(`Error registering for event ${eventId}:`, error);
        return throwError(() => error);
      })
    );
  }
  
  private getAuthHeaders(multipart = false): HttpHeaders {
    const token = localStorage.getItem('authToken');
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    

    if (!multipart) {
      headers = headers.set('Content-Type', 'application/json');
    }
    
    return headers;
  }
}