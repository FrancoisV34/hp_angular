import { Component, computed, effect, OnInit, Signal, signal } from '@angular/core';
import { CharacterModel } from '../../shared/models/character.model';
import { CharacterService } from '../../shared/services/character-service';
import { inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CharactersList } from './characters-list/characters-list';
import { ActivatedRoute, Data } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AddCharacter } from '../add-character/add-character';

@Component({
  selector: 'app-characters',
  imports: [CharactersList, AddCharacter],
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
})
export class Characters implements OnInit {
  private subscriptions: Subscription[] = [];
  protected section = signal('');
  private activatedRoute = inject(ActivatedRoute);
  protected breadcrumb = signal('');
  protected routeData = toSignal(this.activatedRoute.data, {
    initialValue: this.activatedRoute.snapshot.data,
  });

  protected characters = signal<CharacterModel[]>([]);

  protected showAddCharacter = signal(false);

  protected toggleAddCharacter = () => {
    this.showAddCharacter.update((show) => !show);
  };

  constructor(private characterService: CharacterService) {
    effect(() => {
      console.log('Current number of characters:', this.routeData());
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.characterService.getAllCharacter().subscribe((allCharacters: CharacterModel[]) => {
        this.characters.set(allCharacters);
      })
    );
    this.getActivatedRouteData();
  }

  private getActivatedRouteData(): void {
    this.subscriptions.push(
      this.activatedRoute.data.subscribe((data) => {
        this.section.set(data['section']);
        this.breadcrumb.set(data['breadcrumb']);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
