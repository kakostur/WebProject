import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = 'http://localhost:8000/api/events/';

  constructor(private http: HttpClient) {}

  
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, {
      headers: this.getAuthHeaders(), // Передаем заголовки авторизации
    });
  }

  
  addEvent(event: { name: string; date: string; location: string; description?: string; category?: string; photo?: File }): Observable<any> {
    const formData = new FormData();
    formData.append('name', event.name);
    formData.append('date', event.date);
    formData.append('location', event.location);
    if (event.description) formData.append('description', event.description);
    if (event.category) formData.append('category', event.category);
    if (event.photo) formData.append('photo', event.photo);
  
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Токен авторизации
    };
  
    return this.http.post('http://localhost:8000/api/events/create/', formData, { headers });
  }
  

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Добавляем токен
    });
  }
}
