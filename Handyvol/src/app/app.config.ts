
import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes, RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)), // Подключение RouterModule
    provideRouter(routes)
  ]
};
