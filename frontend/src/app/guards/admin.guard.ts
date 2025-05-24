import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = auth.currentUser;

  if (user && user.role === 'ADMIN') {
    return true;
  }

  // Not an admin: redirect to login
  router.navigate(['/login']);
  return false;
};
