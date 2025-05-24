import { Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '',         component: HelloComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**',       redirectTo: '' }
];
