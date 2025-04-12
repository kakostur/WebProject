import { CanActivateFn } from '@angular/router';

// Простой guard для тестирования
export const authGuard: CanActivateFn = (route, state) => {
  // Для тестирования всегда возвращаем true
  // В реальном приложении здесь должна быть проверка аутентификации
  return true;
};