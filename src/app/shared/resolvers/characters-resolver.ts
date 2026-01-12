import { ResolveFn } from '@angular/router';
import { CharacterModel } from '../models/character.model';
import { CharacterService } from '../services/character-service';
import { inject } from '@angular/core';

export const charactersResolver: ResolveFn<CharacterModel[]> = () =>
  inject(CharacterService).getAllCharacter();
