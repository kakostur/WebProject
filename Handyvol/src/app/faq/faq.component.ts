import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent], 
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  activeQuestion: number | null = null;
  faqs: Array<{ id: number; question: string; answer: string }> = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/faq/').subscribe({
      next: (data: any) => {
        this.faqs = data;
        console.log('FAQs loaded:', this.faqs);
      },
      error: (error) => {
        console.error('Error loading FAQs:', error);
      }
    });
  }

  toggleAnswer(questionIndex: number): void {
    this.activeQuestion = this.activeQuestion === questionIndex ? null : questionIndex;
  }
}
