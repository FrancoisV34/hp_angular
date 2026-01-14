import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { SpellModel } from '../models/spell-model';
import { SpellService } from '../services/spell-service';

export const spellsResolver: ResolveFn<SpellModel[]> = () => inject(SpellService).getAllSpells();
