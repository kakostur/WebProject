import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'events', component: EventsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
