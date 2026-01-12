import { CharacterModel } from './character.model';

export interface StaffModel extends CharacterModel {
  hogwartsStaff: true;
  hogwartsStudent: false;
}
