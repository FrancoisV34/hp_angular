import { Wand } from './wand.model';

export interface CharacterModel {
  id: string;
  name: string;
  alternate_names: string[];
  species: Species;
  gender: Gender;
  house: House;
  dateOfBirth: Date;
  year: number;
  wizard: boolean;
  ancestry: string;
  eyeColour: string;
  hairColor: string;
  wand: Wand;
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alternate_actors: string[];
  alive: boolean;
  image: string; // est ce que y a genre link ?
}

export type House = 'Gryffindor' | 'Slytherin' | 'Ravenclaw' | 'Hufflepuff';
export type Gender = 'Male' | 'Female';
export type Species =
  | 'human'
  | 'half-giant'
  | 'dog'
  | 'owl'
  | 'werewolf'
  | 'ghost'
  | 'goblin'
  | 'giant'
  | 'house-elf';
