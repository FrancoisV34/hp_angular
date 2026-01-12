import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, inject, effect } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CharacterService } from '../../shared/services/character-service';
import { CharacterModel } from '../../shared/models/character.model';
import { map, Subscription, switchMap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { CharactersList } from '../characters/characters-list/characters-list';

@Component({
  selector: 'app-character-detail',
  imports: [CharactersList, CommonModule, RouterLink],
  templateUrl: './character-detail.html',
  styleUrl: './character-detail.scss',
})
export class CharacterDetail {
  private titleService = inject(Title);
  private characterService = inject(CharacterService);
  private activatedRoute = inject(ActivatedRoute);

  protected character = toSignal(
    this.activatedRoute.paramMap.pipe(
      map((params) => params.get('id')!),
      switchMap((id: string) => this.characterService.getCharacterById(id)),
      map((list: CharacterModel[]) => list[0] ?? null)
    ),
    { initialValue: null }
  );

  constructor() {
    effect(() => {
      this.titleService.setTitle(
        this.character()?.name ? `Detail - ${this.character()!.name}` : 'HP App - Character Detail'
      );
    });
  }
}
