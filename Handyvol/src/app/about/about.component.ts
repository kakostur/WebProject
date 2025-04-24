import { Component, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Для директив типа *ngIf и *ngFor
import { HttpClientModule } from '@angular/common/http'; // Для AuthService
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent], // Подключаем HttpClientModule
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  features: Array<string> = [];
  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.features = [
      'Compassionate Support',
      'Individual Growth',
      'Inclusive Community',
      'Complete Visibility',
      'Clear Communication'
    ];
  }

  ngAfterViewInit(): void {
    const elements = this.el.nativeElement.querySelectorAll('.animate-on-scroll');
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.observer?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach((el: Element) => this.observer?.observe(el));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
