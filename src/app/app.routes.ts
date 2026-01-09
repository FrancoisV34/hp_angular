import { Routes } from '@angular/router';
import { Home } from './core/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'characters',
    loadComponent: () =>
      import('./components/characters/characters').then((component) => component.Characters),
    title: 'Characters',
    data: { section: 'Harry Potter', breadcrumb: 'Characters' },
  },
  {
    path: 'staff',
    loadComponent: () => import('./components/staff/staff').then((component) => component.Staff),
    title: 'HP - Staff',
    data: { section: 'Harry Potter', breadcrumb: 'Staff' },
  },
];
