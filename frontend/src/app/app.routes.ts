import { Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  { path: '',         component: HelloComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
  { path: '**',       redirectTo: '' }
];
