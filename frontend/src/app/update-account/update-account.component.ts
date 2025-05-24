import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, User } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-account.component.html'
})
export class UpdateAccountComponent {
  user: User = {} as User;
  currentPassword = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    const current = this.authService.currentUser;
    if (current) {
      this.user = { password: '', ...current };
    }
  }

  updateAccount() {
    if (!this.currentPassword) {
      alert('Please enter your current password.');
      return;
    }

    this.userService.verifyPassword(this.user.id!, this.currentPassword).subscribe({
      next: isValid => {
        if (!isValid) {
          alert('Current password is incorrect.');
          return;
        }

        this.userService.updateUser(this.user).subscribe(updated => {
          this.user = updated;
          this.currentPassword = '';
          alert('Account updated.');
          this.router.navigate(['/user']);
        });
      },
      error: () => alert('Failed to verify password.')
    });
  }
}
