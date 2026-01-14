import { ResolveFn } from '@angular/router';
import { CharacterHouseModel } from '../models/character-house.model';
import { inject } from '@angular/core';
import { HousesService } from '../services/houses-service';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

export const characterHouse: ResolveFn<CharacterHouseModel[]> = (route) => {
  const housesService = inject(HousesService);
  const houseName = route.paramMap.get('houseName');
  const allHouses = housesService.getAllHouses();

  if (houseName) {
    // If specific house is requested, get only that house's characters
    return housesService.getCharactersByHouse(houseName).pipe(
      map((characters: CharacterHouseModel[]) => {
        return characters.filter((character) => character.house === houseName);
      })
    );
  } else {
    // Get characters for all houses
    const observables = allHouses.map((house) => housesService.getCharactersByHouse(house));

    return forkJoin(observables).pipe(
      map((results: CharacterHouseModel[][]) => {
        // Flatten the array and filter out characters without houses
        return results.flat().filter((character) => character.house);
      })
    );
  }
};
