import { Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { userGuard } from './guards/user.guard';
import { adminGuard } from './guards/admin.guard';
import {guestGuard} from './guards/guest.guard';
import {UpdateAccountComponent} from './update-account/update-account.component';



export const routes: Routes = [
  { path: '',       redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
  { path: 'login',    component: LoginComponent,  canActivate: [guestGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [userGuard]
  },
  {
    path: 'update-account',
    component: UpdateAccountComponent,
    canActivate: [userGuard] // optional
  },
  { path: '**',       redirectTo: '' }
];
