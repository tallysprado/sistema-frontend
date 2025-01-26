import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConsultarUsuarioComponent } from './pages/consultar-usuario/consultar-usuario.component';
import { CriarUsuarioComponent } from './components/criar-usuario/criar-usuario.component';
import { MatriculaComponent } from './components/matricula-component/matricula.component';
import { canActivateAuthRole } from './guard/auth.guard.routes';
import { ForbiddenComponent } from './pages/forbidden/forbidden/forbidden.component';
import { BlankComponent } from './pages/blank/blank/blank.component';

export const routes: Routes = [
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: 'users/create',
    canActivate: [canActivateAuthRole],
    data: {
      roles: ['coordenador'],
    },
    component: CriarUsuarioComponent,
  },
  {
    path: 'users/edit/:id',
    canActivate: [canActivateAuthRole],
    data: {
      roles: ['coordenador'],
    },
    component: CriarUsuarioComponent,
  },
  {
    path: 'users/aluno',
    canActivate: [canActivateAuthRole],
    data: {
      roles: ['coordenador'],
    },
    component: ConsultarUsuarioComponent,
  },
  {
    path: 'matricula/create',
    canActivate: [canActivateAuthRole],
    data: {
      roles: ['coordenador'],
    },
    component: MatriculaComponent,
  },
  {
    path: 'periodo/create',
    canActivate: [canActivateAuthRole],
    data: {
      roles: ['aluno'],
    },
    component: BlankComponent,
  },
  {
    path: 'periodo/search',
    canActivate: [canActivateAuthRole],
    data: {
      roles: ['aluno'],
    },
    component: BlankComponent,
  },
];
