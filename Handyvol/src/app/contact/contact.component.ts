import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {}
