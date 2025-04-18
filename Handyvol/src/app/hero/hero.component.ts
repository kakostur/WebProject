import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { AboutComponent } from "../about/about.component";
import { EventsComponent } from "../events/events.component";
import { OrganizersComponent } from "../organizers/organizers.component";


@Component({
  selector: 'app-hero',
  imports: [CommonModule, RouterModule, HeaderComponent, AboutComponent, EventsComponent, OrganizersComponent], 
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  showLoginModal = false;
  showRegisterModal = false;

  openLogin() {
    this.showLoginModal = true;
    this.showRegisterModal = false;
  }

  openRegister() {
    this.showLoginModal = false;
    this.showRegisterModal = true;
  }

  closeModals() {
    this.showLoginModal = false;
    this.showRegisterModal = false;
  }
}
