import { Routes } from '@angular/router';
import { Home } from './core/home/home';
import { NotFound } from './core/not-found/not-found';
import { charactersResolver } from './shared/resolvers/characters-resolver';
import { CharacterService } from './shared/services/character-service';
import { inject } from '@angular/core';
import { SpellService } from './shared/services/spell-service';
import { spellsResolver } from './shared/resolvers/spell-resolver';
import { characterDetailResolver } from './shared/resolvers/character-detail-resolver';
import { StudentsService } from './shared/services/student-service';
import { characterHouse } from './shared/resolvers/houses-resolver';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'characters',
    canActivate: [authGuard],
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
        resolve: {
          character: characterDetailResolver,
        },
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
    path: 'students',
    loadComponent: () =>
      import('./components/students/students').then((component) => component.Students),
    title: 'HP - Students',
    data: { section: 'Harry Potter', breadcrumb: 'Students' },
    resolve: { students: () => inject(StudentsService).getAllStudents() },
  },
  {
    path: 'spells',
    children: [
      {
        path: '',
        loadComponent: () => import('./components/spells/spells').then((c) => c.Spells),
        title: 'Spells',
        data: { section: 'Harry Potter', breadcrumb: 'Spells' },
        resolve: { spells: () => inject(SpellService).getAllSpells() },
      },
    ],
  },
  {
    path: 'houses',
    children: [
      {
        path: '',
        loadComponent: () => import('./components/houses/houses').then((c) => c.Houses),
        title: 'Houses',
        resolve: { houses: characterHouse },
      },
      {
        path: ':houseName',
        loadComponent: () => import('./components/houses/houses').then((c) => c.Houses),
        title: (route) => `House ${route.paramMap.get('houseName')}`,
        resolve: { houses: characterHouse },
      },
    ],
  },
  {
    path: '**',
    component: NotFound,
    title: 'Not Found',
    pathMatch: 'full',
  },
];
