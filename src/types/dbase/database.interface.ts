import { Dev } from './dev.interface';
import { Squad } from './squad.interface';

export interface Database {
  squads: Squad[];
  devs: Dev[];
}
