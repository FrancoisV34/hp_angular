import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterModel } from '../../../shared/models/character.model';
import { Router, RouterLink } from '@angular/router';

export interface RouteData {
  section: string;
  breadcrumb: string;
}

@Component({
  selector: 'app-characters-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './characters-list.html',
  styleUrl: './characters-list.scss',
})
export class CharactersList {
  private router = inject(Router);
  characters = input.required<CharacterModel[]>();
  data = input.required<RouteData>();
  protected goToCharacterDetail(id: string): void {
    this.router.navigate(['/characters', id]);
  }
}
