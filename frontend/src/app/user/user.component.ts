import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {User, UserService} from '../services/user.service';
import {FormsModule} from '@angular/forms';
imports: [CommonModule, FormsModule]
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
