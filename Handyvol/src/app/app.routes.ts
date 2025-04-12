// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { AllComponent } from './all/all.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'signup', redirectTo: '/register', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },
  { path: 'all', component: AllComponent },
  { path: 'event-management', component: EventManagementComponent },
  { path: '**', redirectTo: '/login' }
];