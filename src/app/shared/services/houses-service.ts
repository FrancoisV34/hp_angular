import { Injectable, signal, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CharacterModel } from '../models/character.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HousesService {
  private readonly houses = signal(['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin']);
  private readonly httpClient = inject(HttpClient);

  getAllHouses() {
    return this.houses();
  }

  getCharactersByHouse(house: string) {
    return this.httpClient.get<CharacterModel[]>(
      `${environment.baseUrl}/characters/house/${house}`
    );
  }
}
