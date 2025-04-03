import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { EventsComponent } from "./events/events.component";
import { RouterModule } from '@angular/router';
import { AllComponent } from "./all/all.component";
@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, FooterComponent, HeaderComponent, EventsComponent, AllComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Handyvol';
}
