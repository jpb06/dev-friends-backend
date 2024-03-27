import { Injectable, NotFoundException } from '@nestjs/common';
import { map, mergeMap, Observable, of, tap, throwError } from 'rxjs';

import { DataPullService } from '../core/data-pull.service';
import { DataPushService } from '../core/data-push.service';

import { Dev } from '@type/dbase/dev.interface';
import { Squad } from '@type/dbase/squad.interface';

@Injectable()
export class DevsStoreService {
  constructor(
    private dataPush: DataPushService,
    private dataPull: DataPullService,
  ) {}

  public getAll = (): Observable<Dev[]> => this.dataPull.getDevs();

  private throwIfSquadNotFound = (idSquad: number) => (squads: Squad[]) =>
    of(squads).pipe(
      tap((squads) => {
        const squadExists = squads.find(({ id }) => id === idSquad);
        if (!squadExists) {
          return throwError(() => new NotFoundException('Squad not found'));
        }
      }),
    );

  public getBy = (idSquad: number): Observable<Dev[]> =>
    this.dataPull.getSquads().pipe(
      mergeMap(this.throwIfSquadNotFound(idSquad)),
      mergeMap(() => this.dataPull.getDevs()),
      map((devs) => devs.filter((el) => el.idSquad === idSquad)),
    );

  public getFor = (idSquads: number[]): Observable<Dev[]> =>
    this.dataPull
      .getDevs()
      .pipe(map((devs) => devs.filter((el) => idSquads.includes(el.idSquad))));

  public update = (dev: Dev) => this.dataPush.persist(dev, 'devs').subscribe();
}
