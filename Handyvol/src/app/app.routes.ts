import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';
import { EventsComponent } from './events/events.component';
import { AllComponent } from './all/all.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },  // Убрал authGuard чтобы главная была доступна без авторизации
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'events', component: EventsComponent },  // Добавил маршрут к мероприятиям
  { path: 'all', component: AllComponent },  // Добавил маршрут к FAQ
  { path: 'event-management', component: EventManagementComponent },  // Добавил маршрут к управлению мероприятиями
  { path: '**', redirectTo: '/home' }  // Перенаправление на главную при неверном URL
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}