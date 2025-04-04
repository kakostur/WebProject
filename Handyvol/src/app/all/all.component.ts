import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-all',
  standalone: true,  // Указываем, что компонент standalone
  imports: [CommonModule], 
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent {
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
