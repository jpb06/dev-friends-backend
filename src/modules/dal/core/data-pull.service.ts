import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

import { DbPathService } from './db-path.service';

import { Database } from '@type/dbase/database.interface';
import { Dev } from '@type/dbase/dev.interface';
import { Squad } from '@type/dbase/squad.interface';

@Injectable()
export class DataPullService {
  constructor(private dbPath: DbPathService) {}

  async getSquads(): Promise<Squad[]> {
    const db = await fs.readJson(this.dbPath.getDbPath());
    const squads = (db as Database).squads as Squad[];

    return squads;
  }

  async getDevs(): Promise<Dev[]> {
    const db = await fs.readJson(this.dbPath.getDbPath());
    const devs = (db as Database).devs as Dev[];

    return devs;
  }
}
