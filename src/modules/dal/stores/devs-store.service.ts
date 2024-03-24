import { Injectable, NotFoundException } from '@nestjs/common';

import { DataPullService } from '../core/data-pull.service';
import { DataPushService } from '../core/data-push.service';

import { Dev } from '@type/dbase/dev.interface';

@Injectable()
export class DevsStoreService {
  constructor(
    private dataPush: DataPushService,
    private dataPull: DataPullService,
  ) {}

  async getAll(): Promise<Dev[]> {
    const devs = await this.dataPull.getDevs();

    return devs;
  }

  async getBy(idSquad: number): Promise<Dev[]> {
    const squads = await this.dataPull.getSquads();
    const squadExists = squads.some((el) => el.id === idSquad);
    if (!squadExists) {
      throw new NotFoundException('Squad not found');
    }

    const devs = await this.dataPull.getDevs();
    const squadDevs = devs.filter((el) => el.idSquad === idSquad);

    return squadDevs;
  }

  async getFor(idSquads: number[]): Promise<Dev[]> {
    const devs = await this.dataPull.getDevs();

    const squadsDevs = devs.filter((el) => idSquads.includes(el.idSquad));

    return squadsDevs;
  }

  async update(dev: Dev) {
    await this.dataPush.persist(dev, 'devs');

    return true;
  }
}
