import { Component } from '@angular/core';
import { RegisterComponent } from '../components/auth/register.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/auth/login.component';

@Component({
  selector: 'app-footer',
  imports: [RouterModule,RegisterComponent,CommonModule, LoginComponent],
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  subscribeEmail: string = '';

  onSubmit() {
    if (this.subscribeEmail) {
      console.log('Subscribed with email:', this.subscribeEmail);
      // You can send the email to your server or add more logic here
    } else {
      console.log('Please enter an email');
    }
  }
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
