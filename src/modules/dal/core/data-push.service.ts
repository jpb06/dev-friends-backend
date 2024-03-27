import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import { combineLatestWith, from, map, Observable, tap } from 'rxjs';
import { match } from 'ts-pattern';

import { DataPullService } from './data-pull.service';
import { DbPathService } from './db-path.service';

import { Dev } from '@type/dbase/dev.interface';
import { Squad } from '@type/dbase/squad.interface';

type Collection = 'squads' | 'devs';
type PersistedType = Dev | Squad;

interface PersistAllParams {
  squads?: Squad[];
  devs?: Dev[];
}

@Injectable()
export class DataPushService {
  constructor(
    private dbPath: DbPathService,
    private dataPull: DataPullService,
  ) {}

  public persist = (
    item: PersistedType,
    type: Collection,
  ): Observable<PersistedType> =>
    this.getBy(type).pipe(
      map((data) => {
        const existingItem = data.find((el) => el.id === item.id);
        if (existingItem) {
          return data.map((el) => (el.id === item.id ? item : el));
        }

        return [...data, item];
      }),
      tap((data) => this.persistBy(type, data)),
      map(() => item),
    );

  private getBy = (collection: Collection) =>
    match(collection)
      .with('devs', () => this.dataPull.getDevs())
      .with('squads', () => this.dataPull.getSquads())
      .exhaustive() as Observable<PersistedType[]>;

  private persistBy = (collection: Collection, data: PersistedType[]) =>
    match(collection)
      .with('devs', () => this.persistAll({ devs: data as Dev[] }))
      .with('squads', () => this.persistAll({ squads: data as Squad[] }))
      .exhaustive();

  private persistAll = ({ squads, devs }: PersistAllParams) => {
    const path = this.dbPath.getDbPath();
    const squads$ = this.dataPull.getSquads();
    const devs$ = this.dataPull.getDevs();

    return squads$
      .pipe(
        combineLatestWith(devs$),
        map(([pulledSquads, pulledDevs]) => ({
          squads: squads ?? pulledSquads,
          devs: devs ?? pulledDevs,
        })),
        tap((data) => from(fs.writeJson(path, data))),
      )
      .subscribe();
  };
}
