import { CharacterModel } from './character.model';

export interface StudentsModel extends CharacterModel {
  hogwartsStaff: false;
  hogwartsStudent: true;
}
