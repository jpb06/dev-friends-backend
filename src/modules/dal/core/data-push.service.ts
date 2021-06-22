import * as fs from 'fs-extra';

import { Injectable } from '@nestjs/common';
import { Dev } from '@type/dbase/dev.interface';
import { Squad } from '@type/dbase/squad.interface';

import { DataPullService } from './data-pull.service';
import { DbPathService } from './db-path.service';

type Collection = 'squads' | 'devs';
type PersistedType = Dev | Squad;

interface PersistAllParams {
  squads?: Array<Squad>;
  devs?: Array<Dev>;
}

@Injectable()
export class DataPushService {
  constructor(
    private dbPath: DbPathService,
    private dataPull: DataPullService,
  ) {}

  async persist(item: PersistedType, type: Collection): Promise<PersistedType> {
    let data = await this.getBy(type);

    const existingItem = data.find((el) => el.id === item.id);
    if (existingItem) {
      data = data.map((el) => (el.id === item.id ? item : el));
    } else {
      data.push(item);
    }

    await this.persistBy(type, data);
    return item;
  }

  private async getBy(collection: Collection): Promise<Array<PersistedType>> {
    let data: Array<PersistedType>;

    switch (collection) {
      case 'squads':
        data = (await this.dataPull.getSquads()) as Array<PersistedType>;
        break;
      case 'devs':
        data = (await this.dataPull.getDevs()) as Array<PersistedType>;
        break;
    }

    return data;
  }

  private async persistBy(collection: Collection, data: Array<PersistedType>) {
    switch (collection) {
      case 'squads':
        await this.persistAll({ squads: data as Array<Squad> });
        break;
      case 'devs':
        await this.persistAll({ devs: data as Array<Dev> });
        break;
    }
  }

  private async persistAll({ squads, devs }: PersistAllParams) {
    const data = {
      squads: squads ?? (await this.dataPull.getSquads()),
      devs: devs ?? (await this.dataPull.getDevs()),
    };
    await fs.writeJson(this.dbPath.getDbPath(), data);
  }
}
