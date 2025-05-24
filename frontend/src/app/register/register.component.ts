import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../services/user.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  roles = ['USER', 'ADMIN'];
  successMsg = '';
  errorMsg = '';


  constructor(private fb: FormBuilder,
              private userService: UserService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role:     ['USER', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (!this.registerForm.valid) {
      return;
    }
    this.successMsg = '';
    this.errorMsg = '';
    const user: User = this.registerForm.value;

    this.userService.createUser(user).subscribe({
      next: created => {
        this.successMsg = `User “${created.username}” registered successfully!`;
        this.registerForm.reset({ role: 'USER' });
      },
      error: err => {
        const msg = err.error?.message;
        if (err.status === 500 && msg?.includes('duplicate key')) {
          this.errorMsg = 'Username or email already exists.';
        } else {
          this.errorMsg = msg || 'Registration failed. Please try again.';
        }
      }
    });
  }
}
