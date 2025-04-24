import { Routes } from '@angular/router';
import { AuthGuard } from './components/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', loadComponent: () => import('./start/start.component').then(m => m.StartComponent) },
  { path: 'contact', loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent) },
  { path: 'login', loadComponent: () => import('./components/auth/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/auth/register.component').then(m => m.RegisterComponent) },
  { path: 'events', loadComponent: () => import('./events/events.component').then(m => m.EventsComponent) },
  { path: 'about', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) },
  { path: 'faq', loadComponent: () => import('./faq/faq.component').then(m => m.FaqComponent) },
  { path: 'organizers', loadComponent: () => import('./organizers/organizers.component').then(m => m.OrganizersComponent) },
  { path: 'footer', loadComponent: () => import('./footer/footer.component').then(m => m.FooterComponent) },
  {
    path: 'event-management',
    loadComponent: () => import('./event-management/event-management.component').then(m => m.EventManagementComponent),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/start' },
];
