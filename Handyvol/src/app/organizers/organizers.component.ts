import { Component, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-organizers',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent], 
  templateUrl: './organizers.component.html',
  styleUrls: ['./organizers.component.css']
})
export class OrganizersComponent implements AfterViewInit, OnDestroy {
  features: Array<string> = [];
  private observer: IntersectionObserver | null = null;

  currentIndex: number = 0;

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
    // IntersectionObserver can be used here for further animations or lazy loading
  }

  ngOnDestroy(): void {
    // Clean up any observers or subscriptions
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  moveSlide(direction: number): void {
    const slides = document.querySelector('.organizers-container') as HTMLElement;
    const totalSlides = document.querySelectorAll('.organizer-card').length;

    this.currentIndex += direction;

    // When we reach the last slide, jump to the first one without leaving space
    if (this.currentIndex >= totalSlides) {
      this.currentIndex = 0;
    }

    // When going back, show the last card
    if (this.currentIndex < 0) {
      this.currentIndex = totalSlides - 1;
    }

    // Calculate the width of each slide, add margin
    const slideWidth = (document.querySelector('.organizer-card') as HTMLElement).offsetWidth + 30; 
    slides.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
  }
}
