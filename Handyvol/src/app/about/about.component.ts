import { Component} from '@angular/core';
import { AfterViewInit,ElementRef} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  imports: [HeaderComponent]
})
export class AboutComponent implements AfterViewInit {
images: any;
assets: any;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const elements = this.el.nativeElement.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Animate once
        }
      });
    }, {
      threshold: 0.1
    });

    elements.forEach((el: Element) => observer.observe(el));
  }
  features: string[] = [
    'Compassionate Support',
    'Individual Growth',
    'Inclusive Community',
    'Complete Visibility',
    'Clear Communication'
    // Add more features here if needed
  ];
}
