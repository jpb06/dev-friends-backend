import {
  Param,
  ParseIntPipe,
  Controller,
  Get,
  DefaultValuePipe,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { delay, map, Observable } from 'rxjs';

import { AllSquadsResultDto } from './dto/all-squads.result.dto';
import { SquadsDevelopersResultDto } from './dto/squads-developers.result.dto';

import { ApiRoute } from '@decorators/api-route';
import { DevsStoreService } from '@modules/dal/stores/devs-store.service';
import { SquadsStoreService } from '@modules/dal/stores/squads-store.service';

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
    return this.squadsStore.getAll().pipe(
      delay(delayMs),
      map((squads) => ({ result: squads })),
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
  getSquadsDevelopers(
    @Query('delayMs', new DefaultValuePipe(0), ParseIntPipe) delayMs: number,
    @Param('id', new ParseIntPipe()) idSquad: number,
  ): Observable<SquadsDevelopersResultDto> {
    return this.devsStore.getBy(idSquad).pipe(
      delay(delayMs),
      map((devs) => ({ result: devs })),
    );
  }
}
