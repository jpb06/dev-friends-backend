import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

import Database from '@type/dbase/database.interface';
import { Dev } from '@type/dbase/dev.interface';
import { Squad } from '@type/dbase/squad.interface';

import { DbPathService } from './db-path.service';

@Injectable()
export class DataPullService {
  constructor(private dbPath: DbPathService) {}

  async getSquads(): Promise<Array<Squad>> {
    const db = await fs.readJson(this.dbPath.getDbPath());
    const squads = (<Database>db).squads as Array<Squad>;

    return squads;
  }

  async getDevs(): Promise<Array<Dev>> {
    const db = await fs.readJson(this.dbPath.getDbPath());
    const devs = (<Database>db).devs as Array<Dev>;

    return devs;
  }
}
