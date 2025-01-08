import { INavbarData } from './types';

export const navbarData: INavbarData[] = [
  {
    routerLink: 'users',
    icon: 'people',
    label: 'Usuários',
    items: [
      {
        routerLink: 'users/create',
        label: 'Criar',
        icon: 'add_circle',
      },
      {
        routerLink: 'users/search',
        icon: 'person_search',
        label: 'Consultar',
      },
    ],
  },
  {
    routerLink: 'periodo',
    icon: 'fal fa-user',
    label: 'Semestre',
    items: [
      {
        routerLink: 'periodo/create',
        label: 'Disciplina',
      },
      {
        routerLink: 'periodo/search',
        label: 'Consultar',
      },
    ],
  },
  // Outras rotas...
];
