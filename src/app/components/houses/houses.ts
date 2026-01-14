import { Component, inject, OnInit, signal } from '@angular/core';
import { HousesList } from './houses-list/houses-list';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CharacterHouseModel } from '../../shared/models/character-house.model';
import { HousesService } from '../../shared/services/houses-service';

@Component({
  selector: 'app-houses',
  imports: [HousesList],
  templateUrl: './houses.html',
  styleUrl: './houses.scss',
})
export class Houses implements OnInit {
  protected houses = signal<CharacterHouseModel[]>([]);
  protected allHouses = signal<string[]>([]);
  protected currentHouse = signal<string | null>(null);

  private subscriptions: Subscription[] = [];
  protected section = signal('Harry Potter');
  private activatedRoute = inject(ActivatedRoute);
  protected breadcrumb = signal('Houses');

  constructor(private housesService: HousesService) {
    console.log('dans le houses constructor');
  }

  ngOnInit(): void {
    // Get all house names
    this.allHouses.set(this.housesService.getAllHouses());

    // Get current house from route parameters
    this.getCurrentHouseFromRoute();

    // Get resolved houses data from route
    this.getActivatedRouteData();
  }

  // Get house class for container styling
  protected getHouseContainerClass(): string {
    const currentHouse = this.currentHouse();
    if (currentHouse) {
      console.log('Current house in class method:', currentHouse);

      return currentHouse.toLowerCase();
    }
    return '';
  }

  private getCurrentHouseFromRoute(): void {
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe((params) => {
        const houseName = params.get('houseName');
        this.currentHouse.set(houseName);
      })
    );
  }

  private getActivatedRouteData(): void {
    this.subscriptions.push(
      this.activatedRoute.data.subscribe((data) => {
        if (data['houses']) {
          this.houses.set(data['houses']);
        }
        this.section.set(data['section'] || this.section());
        this.breadcrumb.set(data['breadcrumb'] || this.breadcrumb());
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
