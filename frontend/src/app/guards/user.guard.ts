import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const userGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = auth.currentUser;

  if (user && user.role === 'USER') {
    return true;
  }

  // Not a user: redirect to login
  router.navigate(['/login']);
  return false;
};
