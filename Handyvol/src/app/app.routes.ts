
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Импорт компонента для страницы входа
import { SignUpComponent } from './signup/signup.component'; // Импорт компонента для страницы регистрации
import { ProfileComponent } from './profile/profile.component'; // Импортируйте компонент профиля
import { EventsComponent } from './events/events.component';  // Импорт компонента для мероприятий
import { AllComponent } from './all/all.component'; 
import { HeaderComponent } from './header/header.component';  // Импорт компонента Header
import { FooterComponent } from './footer/footer.component'; 
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent }, // Маршрут на страницу профиля
  { path: 'events', component: EventsComponent },
  { path: 'all', component: AllComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}




