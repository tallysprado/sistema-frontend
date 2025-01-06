import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';

export const routes: Routes = [
  {path: '', component: ToolbarComponent},
  { path: 'login', component: LoginComponent }
];
