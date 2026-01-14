import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { HousesService } from '../../shared/services/houses-service';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected housesService = inject(HousesService);
  protected router = inject(Router);
  protected allHouses = this.housesService.getAllHouses();
  protected isHousesDropdownOpen = false;

  toggleHousesDropdown(): void {
    this.isHousesDropdownOpen = !this.isHousesDropdownOpen;
  }

  navigateToHouse(house: string): void {
    this.router.navigate(['/houses', house]);
    this.isHousesDropdownOpen = false;
  }
}
