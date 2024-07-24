import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const isLoggedIn = loginService.isLoggedIn();
  const isLoginRoute = state.url === '/login';

  if (isLoggedIn && isLoginRoute) {
    return router.createUrlTree(['/main']);
  }
  if (!isLoggedIn && !isLoginRoute) {
    return router.createUrlTree(['/login']);
  }

  return isLoggedIn || isLoginRoute;
};
