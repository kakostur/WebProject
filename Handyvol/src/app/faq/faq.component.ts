import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component"; 

@Component({
  selector: 'app-faq',
  standalone: true,  // Указываем, что компонент standalone
  imports: [CommonModule, HeaderComponent], 
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  activeQuestion: number | null = null; // Хранит активный вопрос

  toggleAnswer(questionIndex: number): void {
    // Переключаем видимость ответа для вопроса
    if (this.activeQuestion === questionIndex) {
      this.activeQuestion = null; // Скрываем ответ, если вопрос уже активен
    } else {
      this.activeQuestion = questionIndex; // Показываем ответ для выбранного вопроса
    }
  }
}
