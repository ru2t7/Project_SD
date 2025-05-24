import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
    // later: inject AuthService here
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    // TODO: call your AuthService.login({ username, password })
    //   .subscribe({
    //     next: (res) => {
    //       // store token, navigate based on role
    //       this.router.navigate(['/user']); // or '/admin'
    //     },
    //     error: (err) => { /* show error message */ }
    //   });

    console.log('Login payload', { username, password });
  }
}
