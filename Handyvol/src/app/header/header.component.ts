import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../components/auth/login.component';
import { RegisterComponent } from '../components/auth/register.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginComponent, RegisterComponent], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
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
