import { Component } from '@angular/core';


@Component({
  selector: 'app-footer',
  imports: [],
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
}
