import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {User, UserService} from '../services/user.service';
import {FormsModule} from '@angular/forms';
imports: [CommonModule, FormsModule]
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  user: User = {} as User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    const current = this.authService.currentUser;
    if (current) {
      this.user = {password: '', ...current }; // copy current user
    }
  }

  currentPassword: string = '';

  updateAccount() {
    if (!this.currentPassword) {
      alert('Please enter your current password.');
      return;
    }

    this.userService.verifyPassword(this.user.id!, this.currentPassword).subscribe({
      next: (isValid) => {
        if (!isValid) {
          alert('Current password is incorrect.');
          return;
        }

        this.userService.updateUser(this.user).subscribe(updated => {
          this.user = updated;
          this.currentPassword = '';
          alert('Account updated.');
        });
      },
      error: () => alert('Failed to verify password.')
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
