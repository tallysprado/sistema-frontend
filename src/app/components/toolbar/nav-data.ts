import { INavbarData } from './types';

export const navbarData: INavbarData[] = [
  {
    routerLink: 'users',
    icon: 'people',
    label: 'Usuários',
    roles: ['coordenador'],
    items: [
      {
        routerLink: 'users/create',
        label: 'Criar',
        icon: 'add_circle',
        roles: ['coordenador'],
      },
      {
        routerLink: 'users/aluno',
        icon: 'person_search',
        label: 'Consultar',
        roles: ['coordenador'],
        items: [
          {
            routerLink: 'users/aluno/create',
            label: 'Criar',
            icon: 'add_circle',
            roles: ['coordenador'],
          },
        ],
      },
    ],
  },
  {
    routerLink: 'matricula',
    icon: 'fal fa-user',
    label: 'Matrícula',
    roles: ['coordenador'],
    items: [
      {
        routerLink: 'matricula/create',
        label: 'Aluno',
        icon: 'add_circle',
        roles: ['coordenador'],
      },
    ],
  },
  {
    routerLink: 'periodo',
    icon: 'fal fa-user',
    label: 'Grade Curricular',
    roles: ['aluno'],
    items: [
      {
        routerLink: 'periodo/create',
        label: 'Disciplina',
        icon: 'book',
        roles: ['aluno'],
      },
      {
        routerLink: 'periodo/search',
        label: 'Consultar',
        icon: 'search',
        roles: ['aluno'],
      },
    ],
  },
];
