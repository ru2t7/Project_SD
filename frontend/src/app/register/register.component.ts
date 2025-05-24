import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  roles = ['USER', 'ADMIN'];

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
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;
      this.userService.createUser(user).subscribe({
        next: (created) => {
          console.log('User created:', created);
          // TODO: navigate to login or user page
        },
        error: (err) => {
          console.error('Error creating user:', err);
        }
      });
    }
  }
}
