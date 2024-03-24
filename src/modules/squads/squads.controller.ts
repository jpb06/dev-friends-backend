import {
  Param,
  ParseIntPipe,
  Controller,
  Get,
  DefaultValuePipe,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { delay } from '../../util/delay';

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
  async getAllSquads(
    @Query('delayMs', new DefaultValuePipe(0), ParseIntPipe) delayMs: number,
  ): Promise<AllSquadsResultDto> {
    const squads = await this.squadsStore.getAll();

    if (delayMs !== 0) {
      await delay(delayMs);
    }

    return { result: squads };
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
  async getSquadsDevelopers(
    @Query('delayMs', new DefaultValuePipe(0), ParseIntPipe) delayMs: number,
    @Param('id', new ParseIntPipe()) idSquad: number,
  ): Promise<SquadsDevelopersResultDto> {
    const devs = await this.devsStore.getBy(idSquad);

    if (delayMs !== 0) {
      await delay(delayMs);
    }

    return { result: devs };
  }
}
