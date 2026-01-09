import { Component, OnInit, signal } from '@angular/core';
import { CharacterModel } from '../../shared/models/character.model';
import { CharacterService } from '../../shared/services/character-service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CharactersList } from './characters-list/characters-list';

@Component({
  selector: 'app-characters',
  imports: [CharactersList],
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
})
export class Characters implements OnInit {
  protected characters = signal<CharacterModel[]>([]);

  constructor(private characterService: CharacterService) {
    console.log('dans le constructor');
  }

  ngOnInit(): void {
    this.characterService.getAllCharacter().subscribe((allCharacters: CharacterModel[]) => {
      this.characters.set(allCharacters);
      console.log('Données chargées:', allCharacters);
      console.log('Nombre de personnages:', allCharacters.length);
    });
    console.log('Component loaded');
  }
}
