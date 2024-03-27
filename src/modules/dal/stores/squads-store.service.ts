import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';

import { DataPullService } from '../core/data-pull.service';

import { Squad } from '@type/dbase/squad.interface';

@Injectable()
export class SquadsStoreService {
  constructor(private dataPull: DataPullService) {}

  public getAll = (): Observable<Squad[]> => from(this.dataPull.getSquads());
}
