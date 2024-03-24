import { Injectable } from '@nestjs/common';

import { DataPullService } from '../core/data-pull.service';

import { Squad } from '@type/dbase/squad.interface';

@Injectable()
export class SquadsStoreService {
  constructor(private dataPull: DataPullService) {}

  async getAll(): Promise<Squad[]> {
    const squads = await this.dataPull.getSquads();

    return squads;
  }
}
