import { Routes } from '@angular/router';
import { Home } from './core/home/home';
import { NotFound } from './core/not-found/not-found';
import { charactersResolver } from './shared/resolvers/characters-resolver';
import { CharacterService } from './shared/services/character-service';
import { inject } from '@angular/core';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'characters',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/characters/characters').then((component) => component.Characters),
        title: 'Characters',
        data: { section: 'Harry Potter', breadcrumb: 'Characters' },
        resolve: { characters: () => inject(CharacterService).getAllCharacter() },
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./components/character-detail/character-detail').then(
            (component) => component.CharacterDetail
          ),
        title: 'Character Detail',
        data: { section: 'Harry Potter', breadcrumb: 'Character Detail' },
      },
    ],
  },
  {
    path: 'staff',
    loadComponent: () => import('./components/staff/staff').then((component) => component.Staff),
    title: 'HP - Staff',
    data: { section: 'Harry Potter', breadcrumb: 'Staff' },
  },

  {
    path: '**',
    component: NotFound,
    title: 'Not Found',
    pathMatch: 'full',
  },
];
