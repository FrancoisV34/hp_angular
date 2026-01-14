import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SpellModel } from '../models/spell-model';

@Injectable({
  providedIn: 'root',
})
export class SpellService {
  //call httpClient
  private httpClient = inject(HttpClient);

  //begin with getAllSpells method
  getAllSpells() {
    return this.httpClient.get<SpellModel[]>(environment.baseUrl + '/spells');
  }
}
