import { CharacterModel } from './character.model';

export interface StaffModel extends CharacterModel {
  hogwartStaff: true;
}
