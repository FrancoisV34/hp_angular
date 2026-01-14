import { Component, computed, output, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterModel, Gender, House, Species } from '@shared/models/character.model';
import { Wand } from '@shared/models/wand.model';

@Component({
  selector: 'app-add-character',
  imports: [FormsModule],
  templateUrl: './add-character.html',
  styleUrl: './add-character.scss',
})
export class AddCharacter {
  emitNewCharacter = output<CharacterModel[]>();

  private houses: House[] = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
  private genders: Gender[] = ['Male', 'Female'];
  private species: Species[] = [
    'human',
    'half-giant',
    'dog',
    'owl',
    'werewolf',
    'ghost',
    'goblin',
    'giant',
    'house-elf',
  ];
  //Create the form model
  protected name: WritableSignal<string> = signal('');
  protected alternate_names: WritableSignal<string[]> = signal([]);
  protected specie = signal<Species>('half-giant');
  protected gender = signal<Gender>('Male');
  protected house = signal<House>('Gryffindor');
  protected dateOfBirth: WritableSignal<String | null> = signal<String | null>('');
  protected year: WritableSignal<number | null> = signal<number | null>(null);
  protected wizard: WritableSignal<boolean> = signal(true);
  protected ancestry: WritableSignal<string> = signal('');
  protected eyeColour: WritableSignal<string> = signal('');
  protected hairColor: WritableSignal<string> = signal('');
  protected patronus: WritableSignal<string> = signal('');
  protected hogwartsStudent: WritableSignal<boolean> = signal(true);
  protected hogwartsStaff: WritableSignal<boolean> = signal(false);
  protected actor: WritableSignal<string> = signal('');
  protected alternate_actors: WritableSignal<string[]> = signal([]);
  protected alive: WritableSignal<boolean> = signal(true);
  protected image: WritableSignal<string> = signal('');
  protected wand: WritableSignal<Wand> = signal<Wand>({ wood: '', core: '', length: null });

  //ajout validateurs

  nameValid = computed(() => this.name().trim().length > 2);
  actorValid = computed(() => this.actor().trim().length > 2);

  //recupere données
  protected newAltName = signal('');
  protected newAltActor = signal('');
  //Envoyer au parent output
  updateWand(field: keyof Wand, value: any) {
    this.wand.update((current) => ({
      ...current,
      [field]: value,
    }));
  }

  // Méthode de soumission
  onSubmit() {
    if (this.nameValid() && this.actorValid()) {
      const character = {
        id: crypto.randomUUID(),
        name: this.name(),
        alternate_names: this.alternate_names(),
        species: this.specie(),
        gender: this.gender(),
        house: this.house(),
        dateOfBirth: this.dateOfBirth(),
        yearOfBirth: this.year(),
        wizard: this.wizard(),
        ancestry: this.ancestry(),
        eyeColour: this.eyeColour(),
        hairColour: this.hairColor(),
        patronus: this.patronus(),
        hogwartsStudent: this.hogwartsStudent(),
        hogwartsStaff: this.hogwartsStaff(),
        actor: this.actor(),
        alternate_actors: this.alternate_actors(),
        alive: this.alive(),
        image: this.image(),
        wand: this.wand(),
      };

      console.log('Character to add:', character);
      // TODO: Émettre vers le parent avec @Output()
    }
    // this.emitNewCharacter.emit([character]);
    this.resetForm();
  }

  // Méthode de réinitialisation
  resetForm() {
    this.name.set('');
    this.specie.set('human');
    this.gender.set('Male');
    this.house.set('Gryffindor');
    this.dateOfBirth.set('');
    this.year.set(null);
    this.wizard.set(true);
    this.ancestry.set('');
    this.eyeColour.set('');
    this.hairColor.set('');
    this.patronus.set('');
    this.hogwartsStudent.set(true);
    this.hogwartsStaff.set(false);
    this.actor.set('');
    this.alive.set(true);
    this.image.set('');
    this.wand.set({ wood: '', core: '', length: null });
  }
}
