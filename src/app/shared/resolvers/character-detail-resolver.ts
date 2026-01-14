import { inject } from '@angular/core';
import { CharacterModel } from '../models/character.model';
import { ResolveFn } from '@angular/router';
import { CharacterService } from '../services/character-service';
import { map } from 'rxjs';

export const characterDetailResolver: ResolveFn<CharacterModel | null> = (route) => {
  const characterService = inject(CharacterService);
  const id = route.paramMap.get('id')!;

  if (!id) {
    return null;
  }

  return characterService.getCharacterById(id).pipe(
    // Assuming the service returns an array, we take the first element or null
    map((characters: CharacterModel[]) => characters[0] ?? null)
  );
};
