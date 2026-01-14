import { CharacterModel } from './character.model';

export interface CharacterHouseModel extends CharacterModel {
  house: 'Gryffindor' | 'Hufflepuff' | 'Ravenclaw' | 'Slytherin';
}
