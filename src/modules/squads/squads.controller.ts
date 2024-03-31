import {
  Param,
  ParseIntPipe,
  Controller,
  Get,
  DefaultValuePipe,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { delay, map, Observable, zip } from 'rxjs';

import { ParsePositiveIntegerPipe } from '../../pipes/parse-positive-integer/parse-positive-integer.pipe';

import { AllSquadsResultDto } from './dto/all-squads.result.dto';
import { SquadsDevelopersResultDto } from './dto/squads-developers.result.dto';

import { ApiRoute } from '@decorators/api-route';
import { DevsStoreService } from '@modules/dal/stores/devs-store.service';
import { SquadsStoreService } from '@modules/dal/stores/squads-store.service';
import { createPaginatedResponse } from 'logic/create-paginated-response.logic';

@Controller('squads')
@ApiTags('squads')
export class SquadsController {
  constructor(
    private readonly squadsStore: SquadsStoreService,
    private readonly devsStore: DevsStoreService,
  ) {}

  @Get()
  @ApiRoute({
    summary: 'Get all squads',
    description: 'Retrieves all the squads, but not their members',
    ok: {
      type: AllSquadsResultDto,
      description: 'The available squads',
    },
  })
  @ApiQuery({
    name: 'delayMs',
    description: 'A delay in milliseconds before returning the result',
    required: false,
    type: Number,
  })
  getAllSquads(
    @Query('delayMs', new DefaultValuePipe(0), ParseIntPipe) delayMs: number,
  ): Observable<AllSquadsResultDto> {
    return zip(this.squadsStore.getAll(), this.devsStore.getAll()).pipe(
      delay(delayMs),
      map(([squads, devs]) => ({
        result: squads.map((squad) => ({
          ...squad,
          devsCount: devs.filter((dev) => dev.idSquad === squad.id).length,
        })),
      })),
    );
  }

  @Get(':id/devs')
  @ApiRoute({
    summary: 'Get the developers belonging to a squad',
    description: 'Retrieves the squad developers',
    ok: {
      type: SquadsDevelopersResultDto,
      description: 'The squad developers',
    },
    notFound: { description: "The requested squad wasn't found" },
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
  getSquadsDevelopers(
    @Query('delayMs', new DefaultValuePipe(0), ParseIntPipe) delayMs: number,
    @Query('page', new DefaultValuePipe(1), ParsePositiveIntegerPipe)
    page: number,
    @Query('byPage', new DefaultValuePipe(20), ParsePositiveIntegerPipe)
    byPage: number,
    @Param('id', new ParseIntPipe()) idSquad: number,
  ): Observable<SquadsDevelopersResultDto> {
    return this.devsStore
      .getBy(idSquad)
      .pipe(delay(delayMs), map(createPaginatedResponse(page, byPage)));
  }
}
