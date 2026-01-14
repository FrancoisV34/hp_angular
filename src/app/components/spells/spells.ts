import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { SpellsList } from './spells-list/spells-list';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { SpellModel } from '../../shared/models/spell-model';
import { SpellService } from '../../shared/services/spell-service';

@Component({
  selector: 'app-spells',
  imports: [SpellsList],
  templateUrl: './spells.html',
  styleUrl: './spells.scss',
})
export class Spells implements OnInit {
  //Subscriptions array to hold any subscriptions
  private subscriptions: Subscription[] = [];

  //datas from activated route
  protected section = signal('');
  protected breadcrumb = signal('');
  private activatedRoute = inject(ActivatedRoute);
  protected routeData = toSignal(this.activatedRoute.data, {
    initialValue: this.activatedRoute.snapshot.data,
  });

  //the principal variable = spells
  protected spells = signal<SpellModel[]>([]);

  //constructor
  constructor(private spellService: SpellService) {
    effect(() => {
      console.log('Current number of spells:', this.routeData());
    });
  }

  //init lifecycle hook
  ngOnInit(): void {
    this.subscriptions.push(
      this.spellService.getAllSpells().subscribe((allSpells: SpellModel[]) => {
        this.spells.set(allSpells);
      })
    );
    this.getActivatedRouteData();
  }

  //method to get data from activated route
  private getActivatedRouteData(): void {
    this.subscriptions.push(
      this.activatedRoute.data.subscribe((data) => {
        this.section.set(data['section']);
        this.breadcrumb.set(data['breadcrumb']);
      })
    );
  }

  //destroy lifecycle hook to clean up subscriptions
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
