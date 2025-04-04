import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { EventsComponent } from './events/events.component';
import { AllComponent } from './all/all.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,  // Этот флаг делает компонент standalone
  templateUrl: './app.component.html',
  imports: [RouterModule, FooterComponent, HeaderComponent, EventsComponent, AllComponent], 
})
export class AppComponent {}
