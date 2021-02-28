import { Dev } from "./core/dev.interface";
import { Squad } from "./core/squad.interface";

export default interface Database {
  squads: Array<Squad>;
  devs: Array<Dev>;
}
