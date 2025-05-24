import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = auth.currentUser;

  if (!user) {
    // Not logged in—allow access to login/register
    return true;
  }

  // Already logged in—redirect to appropriate dashboard
  if (user.role === 'ADMIN') {
    router.navigate(['/admin']);
  } else {
    router.navigate(['/user']);
  }
  return false;
};
