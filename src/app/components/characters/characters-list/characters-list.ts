import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterModel } from '../../../shared/models/character.model';

@Component({
  selector: 'app-characters-list',
  imports: [CommonModule],
  templateUrl: './characters-list.html',
  styleUrl: './characters-list.scss',
})
export class CharactersList {
  // @Input() characters: CharacterModel[] = [];

  characters = input.required<CharacterModel[]>();

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['characters']) {
  //     console.log('CharactersList - Données reçues:', this.characters);
  //     console.log('CharactersList - Nombre de personnages:', this.characters?.length || 0);
  //   }
  // }
}
