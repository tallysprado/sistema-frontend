import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { ConsultarUsuarioComponent } from './pages/consultar-usuario/consultar-usuario.component';


export const routes: Routes = [
  {
    path: 'users/create', component: LoginComponent,

  },
  { path: 'users/search', component: ConsultarUsuarioComponent }
];
