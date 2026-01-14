import { CommonModule } from '@angular/common';
import { Component, inject, effect, computed, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CharacterModel } from '../../shared/models/character.model';
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

  private activatedRoute = inject(ActivatedRoute);

  private routeData = toSignal(this.activatedRoute.data, {
    initialValue: this.activatedRoute.snapshot.data,
  });

  protected character: Signal<CharacterModel> = computed(() => this.routeData()['character']);

  constructor() {
    effect(() => {
      this.titleService.setTitle(
        this.character()?.name ? `Detail - ${this.character()!.name}` : 'HP App - Character Detail'
      );
    });
  }
}
