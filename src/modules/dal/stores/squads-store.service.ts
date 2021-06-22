import { Injectable } from '@nestjs/common';
import { Squad } from '@type/dbase/squad.interface';

import { DataPullService } from '../core/data-pull.service';

@Injectable()
export class SquadsStoreService {
  constructor(private dataPull: DataPullService) {}

  async getAll(): Promise<Array<Squad>> {
    const squads = await this.dataPull.getSquads();

    return squads;
  }
}
