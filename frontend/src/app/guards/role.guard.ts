import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.currentUser;

  if (user && (user.role === 'USER' || user.role === 'ADMIN')) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
