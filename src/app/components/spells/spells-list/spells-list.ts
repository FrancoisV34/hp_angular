import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpellModel } from '../../../shared/models/spell-model';
import { Router, RouterLink } from '@angular/router';

//export route data interface
export interface RouteData {
  section: string;
  breadcrumb: string;
}

//define component
@Component({
  selector: 'app-spells-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './spells-list.html',
  styleUrl: './spells-list.scss',
})
export class SpellsList {
  //router
  private router = inject(Router);

  //inputs
  spells = input.required<SpellModel[]>();
  data = input.required<RouteData>();

  //method to go to spell detail (maybe later)
  // protected goToSpellDetail(id: string): void {
  //   this.router.navigate(['/spells', id]);
  // }

  // Helper methods for spell categorization
  protected getSpellType(spellName: string): string {
    const name = spellName.toLowerCase();
    if (name.includes('patronus') || name.includes('expecto patronum')) return 'defense';
    if (name.includes('avada') || name.includes('crucio') || name.includes('imperio'))
      return 'dark';
    if (name.includes('lumos') || name.includes('nox')) return 'utility';
    if (name.includes('accio') || name.includes('wingardium')) return 'transfiguration';
    if (name.includes('stupefy') || name.includes('expelliarmus')) return 'combat';
    if (name.includes('reparo') || name.includes('episkey')) return 'healing';
    return 'general';
  }

  protected getSpellEmoji(spellName: string): string {
    const type = this.getSpellType(spellName);
    switch (type) {
      case 'defense':
        return '🛡️';
      case 'dark':
        return '🌑';
      case 'utility':
        return '💡';
      case 'transfiguration':
        return '🔄';
      case 'combat':
        return '⚔️';
      case 'healing':
        return '✨';
      default:
        return '🔮';
    }
  }

  protected getSpellDifficulty(spellName: string): string {
    const name = spellName.toLowerCase();
    if (name.includes('avada') || name.includes('crucio') || name.includes('imperio'))
      return 'forbidden';
    if (name.includes('patronus') || name.includes('expecto patronum')) return 'advanced';
    if (name.includes('stupefy') || name.includes('expelliarmus')) return 'intermediate';
    if (name.includes('lumos') || name.includes('nox') || name.includes('accio')) return 'beginner';
    return 'intermediate';
  }

  protected getSpellDifficultyText(spellName: string): string {
    const difficulty = this.getSpellDifficulty(spellName);
    switch (difficulty) {
      case 'forbidden':
        return 'Forbidden';
      case 'advanced':
        return 'Advanced';
      case 'intermediate':
        return 'Intermediate';
      case 'beginner':
        return 'Beginner';
      default:
        return 'Unknown';
    }
  }

  protected getSpellCategory(spellName: string): string {
    const type = this.getSpellType(spellName);
    switch (type) {
      case 'defense':
        return 'Defense Against Dark Arts';
      case 'dark':
        return 'Dark Magic';
      case 'utility':
        return 'Utility';
      case 'transfiguration':
        return 'Transfiguration';
      case 'combat':
        return 'Combat';
      case 'healing':
        return 'Healing';
      default:
        return 'General Magic';
    }
  }
}
