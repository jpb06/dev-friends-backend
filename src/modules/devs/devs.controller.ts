/* eslint-disable no-console */
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  filter,
  map,
  mergeMap,
  Observable,
  delay,
  toArray,
  of,
  throwError,
  tap,
} from 'rxjs';

import { createPaginatedResponse } from '../../logic/create-paginated-response.logic';
import { ParsePositiveIntegerPipe } from '../../pipes/parse-positive-integer/parse-positive-integer.pipe';

import { AllDevsResultDto } from './dto/all-devs.result.dto';
import { ChangeSquadBodyDto } from './dto/change-squad.body.dto';
import { ChangeSquadResultDto } from './dto/change-squad.result.dto';
import { DevelopersBySquadsBodyDto } from './dto/developers-by-squads.body.dto';
import { DevelopersBySquadsResultDto } from './dto/developers-by-squads.result.dto';

import { ApiRoute } from '@decorators/api-route';
import { DevsStoreService } from '@modules/dal/stores/devs-store.service';
import { SquadsStoreService } from '@modules/dal/stores/squads-store.service';
import { Dev } from '@type/dbase/dev.interface';

@Controller('devs')
@ApiTags('devs')
export class DevsController {
  constructor(
    private readonly squadsStore: SquadsStoreService,
    private readonly devsStore: DevsStoreService,
  ) {}

  @Get()
  @ApiRoute({
    summary: 'Get all developers',
    description: 'Retrieves all developers, but not their squad',
    ok: {
      type: AllDevsResultDto,
      description: 'The available developers',
    },
  })
  @ApiQuery({
    name: 'delayMs',
    description: 'A delay in milliseconds before returning the result',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page to fetch, starting at 1',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'byPage',
    description: 'Numbers of developers to fetch per page',
    required: false,
    type: Number,
  })
  getAllDevelopers(
    @Query('delayMs', new DefaultValuePipe(0), ParseIntPipe)
    delayMs: number,
    @Query('page', new DefaultValuePipe(1), ParsePositiveIntegerPipe)
    page: number,
    @Query('byPage', new DefaultValuePipe(20), ParsePositiveIntegerPipe)
    byPage: number,
  ): Observable<AllDevsResultDto> {
    return this.devsStore
      .getAll()
      .pipe(delay(delayMs), map(createPaginatedResponse(page, byPage)));
  }

  private throwIfDevNotFound = (idDev: number) => (devs: Dev[]) =>
    of(devs).pipe(
      mergeMap((devs) => {
        const dev = devs.find((dev) => dev.id === idDev);
        if (!dev) {
          return throwError(() => new NotFoundException('Dev not found'));
        }

        return of(dev);
      }),
    );

  private throwIfSquadNotFound = (idSquad: number) => (dev: Dev) =>
    this.squadsStore.getAll().pipe(
      mergeMap((squads) => {
        const squad = squads.find((squad) => squad.id === idSquad);
        if (!squad) {
          return throwError(() => new NotFoundException('Squad not found'));
        }

        return of({ dev, squad });
      }),
    );

  @Post('change-squad')
  @ApiRoute({
    summary: 'Moves the developer to another squad',
    description: 'Changes the squad of the developer',
    ok: {
      type: ChangeSquadResultDto,
      description:
        'A message containing the name of the developer and his new squad',
      schema: {
        example: `Yolo McCool moved to squad 4`,
      },
    },
    notFound: {
      description:
        'We may receive a not found if either the developers or the squad could not be found',
    },
    badRequest: {},
  })
  @ApiQuery({
    name: 'delayMs',
    description: 'A delay in milliseconds before returning the result',
    required: false,
    type: Number,
  })
  changeDeveloperSquad(
    @Query('delayMs', new DefaultValuePipe(0), ParseIntPipe) delayMs: number,
    @Body() { idDev, idSquad }: ChangeSquadBodyDto,
  ): Observable<ChangeSquadResultDto> {
    return this.devsStore.getAll().pipe(
      delay(delayMs),
      mergeMap(this.throwIfDevNotFound(idDev)),
      mergeMap(this.throwIfSquadNotFound(idSquad)),
      tap(({ dev }) => this.devsStore.update({ ...dev, idSquad })),
      map(({ dev, squad }) => ({
        result: `${dev.firstName} moved to squad ${squad.name}`,
      })),
    );
  }

  @Post('by-squads')
  @ApiRoute({
    summary: 'Get developers belonging to one or several squads',
    description: 'Retrieves the developers belonging to a set of squads',
    created: {
      type: DevelopersBySquadsResultDto,
      description: 'The developers',
    },
    badRequest: {},
  })
  @ApiQuery({
    name: 'delayMs',
    description: 'A delay in milliseconds before returning the result',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page to fetch, starting at 1',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'byPage',
    description: 'Numbers of developers to fetch per page',
    required: false,
    type: Number,
  })
  public getDevelopersBySquads(
    @Query('delayMs', new DefaultValuePipe(0), ParseIntPipe) delayMs: number,
    @Query('page', new DefaultValuePipe(1), ParsePositiveIntegerPipe)
    page: number,
    @Query('byPage', new DefaultValuePipe(20), ParsePositiveIntegerPipe)
    byPage: number,
    @Body() { idSquads }: DevelopersBySquadsBodyDto,
  ): Observable<DevelopersBySquadsResultDto> {
    return this.devsStore.getAll().pipe(
      delay(delayMs),
      mergeMap((l) => l),
      filter((dev) => idSquads.includes(dev.idSquad)),
      toArray(),
      map(createPaginatedResponse(page, byPage)),
    );
  }
}
