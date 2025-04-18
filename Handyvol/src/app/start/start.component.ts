import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../components/auth/login.component';
import { RegisterComponent } from '../components/auth/register.component';
import { HeaderComponent } from '../header/header.component'; 

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginComponent, RegisterComponent, HeaderComponent], 
  templateUrl: './start.component.html',
  styleUrls: [
    './start.component.css', 
    '../components/auth/login.component.css', 
    '../components/auth/register.component.css', 
    '../events/events.component.css',
    '../header/header.component.css',
  ]
})
export class StartComponent {
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
