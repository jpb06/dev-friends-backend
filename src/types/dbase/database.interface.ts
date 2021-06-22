import { Dev } from './dev.interface';
import { Squad } from './squad.interface';

export default interface Database {
  squads: Array<Squad>;
  devs: Array<Dev>;
}
