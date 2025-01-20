import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConsultarUsuarioComponent } from './pages/consultar-usuario/consultar-usuario.component';
import { CriarUsuarioComponent } from './components/criar-usuario/criar-usuario.component';
export const routes: Routes = [
  {
    path: 'users/create',
    component: CriarUsuarioComponent,
  },
  {
    path: 'users/aluno',
    component: ConsultarUsuarioComponent,
  },
];
