import { Component, effect, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CharacterHouseModel } from '../../../shared/models/character-house.model';

@Component({
  selector: 'app-houses-list',
  imports: [],
  templateUrl: './houses-list.html',
  styleUrl: './houses-list.scss',
})
export class HousesList {
  private activatedRoute = inject(ActivatedRoute);

  private routeData = toSignal(this.activatedRoute.data, {
    initialValue: this.activatedRoute.snapshot.data,
  });

  // Input properties from parent component
  houses = input<CharacterHouseModel[]>([]);
  allHouses = input<string[]>([]);
  currentHouse = input<string | null>(null);

  constructor() {
    effect(() => {
      console.log('routeData houses:', this.routeData()['houses']);
      console.log('Houses data:', this.houses());
      console.log('All houses:', this.allHouses());
    });
  }

  // Group characters by house
  protected getCharactersByHouse(house: string): CharacterHouseModel[] {
    return this.houses().filter((character) => character.house === house);
  }
}
