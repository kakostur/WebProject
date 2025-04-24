import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FormsModule, HttpClientModule, FooterComponent], 
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  sendMessage(): void {
    this.http.post('http://localhost:8000/api/contact/', this.contactData).subscribe({
      next: (response) => {
        console.log('Message sent successfully:', response);
        this.contactData = { name: '', email: '', message: '' };
      },
      error: (error) => {
        console.error('Error sending message:', error);
      }
    });
  }
}
