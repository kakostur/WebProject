import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component'; 

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent], 
  templateUrl: './start.component.html',
  styleUrls: [
    './start.component.css', 
    '../events/events.component.css',
    '../header/header.component.css',
  ]
})
export class StartComponent {}
