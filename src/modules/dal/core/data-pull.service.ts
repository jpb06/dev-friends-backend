import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import { from, map, Observable } from 'rxjs';

import { DbPathService } from './db-path.service';

import { Database } from '@type/dbase/database.interface';
import { Dev } from '@type/dbase/dev.interface';
import { Squad } from '@type/dbase/squad.interface';

@Injectable()
export class DataPullService {
  constructor(private dbPath: DbPathService) {}

  getSquads(): Observable<Squad[]> {
    const path = this.dbPath.getDbPath();

    return from(fs.readJson(path)).pipe(map((db) => (db as Database).squads));
  }

  getDevs(): Observable<Dev[]> {
    const path = this.dbPath.getDbPath();

    return from(fs.readJson(path)).pipe(map((db) => (db as Database).devs));
  }
}
