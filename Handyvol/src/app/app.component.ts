import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { EventsComponent } from './events/events.component';
import { AllComponent } from './all/all.component';

@Component({
  selector: 'app-root',
  standalone: true,  // Обязательно указываем standalone для компонента
  imports: [RouterModule, FooterComponent, HeaderComponent, EventsComponent, AllComponent],  // Импортируем компоненты, которые используются внутри
  templateUrl: './app.component.html',
})
export class AppComponent {}
