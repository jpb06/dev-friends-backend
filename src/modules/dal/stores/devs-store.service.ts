import { Injectable, NotFoundException } from '@nestjs/common';

import { Dev } from '@type/dbase/dev.interface';

import { DataPullService } from '../core/data-pull.service';
import { DataPushService } from '../core/data-push.service';

@Injectable()
export class DevsStoreService {
  constructor(
    private dataPush: DataPushService,
    private dataPull: DataPullService,
  ) {}

  async getAll(): Promise<Array<Dev>> {
    const devs = await this.dataPull.getDevs();

    return devs;
  }

  async getBy(idSquad: number): Promise<Array<Dev>> {
    const squads = await this.dataPull.getSquads();
    const squadExists = squads.some((el) => el.id === idSquad);
    if (!squadExists) {
      throw new NotFoundException('Squad not found');
    }

    const devs = await this.dataPull.getDevs();
    const squadDevs = devs.filter((el) => el.squad === idSquad);

    return squadDevs;
  }

  async getFor(idSquads: Array<number>): Promise<Array<Dev>> {
    const devs = await this.dataPull.getDevs();

    const squadsDevs = devs.filter((el) => idSquads.includes(el.squad));

    return squadsDevs;
  }

  async update(dev: Dev) {
    await this.dataPush.persist(dev, 'devs');

    return true;
  }
}
