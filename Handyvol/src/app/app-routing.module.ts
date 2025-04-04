import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventManagementComponent } from './event-management/event-management.component';

export const routes: Routes = [
  { path: 'event-management', component: EventManagementComponent },
  { path: '', redirectTo: '/event-management', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
