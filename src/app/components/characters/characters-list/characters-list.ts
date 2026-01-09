import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterModel } from '../../../shared/models/character.model';

export interface RouteData {
  section: string;
  breadcrumb: string;
}

@Component({
  selector: 'app-characters-list',
  imports: [CommonModule],
  templateUrl: './characters-list.html',
  styleUrl: './characters-list.scss',
})
export class CharactersList {
  characters = input.required<CharacterModel[]>();
  data = input.required<RouteData>();
}
