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

import { delay } from '../../util/delay';

import { AllDevsResultDto } from './dto/all-devs.result.dto';
import { ChangeSquadBodyDto } from './dto/change-squad.body.dto';
import { ChangeSquadResultDto } from './dto/change-squad.result.dto';
import { DevelopersBySquadsBodyDto } from './dto/developers-by-squads.body.dto';
import { DevelopersBySquadsResultDto } from './dto/developers-by-squads.result.dto';

import { ApiRoute } from '@decorators/api-route';
import { DevsStoreService } from '@modules/dal/stores/devs-store.service';
import { SquadsStoreService } from '@modules/dal/stores/squads-store.service';

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
  async getAllDevelopers(
    @Query('delayMs', new DefaultValuePipe(0), ParseIntPipe) delayMs: number,
  ): Promise<AllDevsResultDto> {
    const devs = await this.devsStore.getAll();

    if (delayMs !== 0) {
      await delay(delayMs);
    }

    return { result: devs };
  }

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
  async changeDeveloperSquad(
    @Query('delayMs', new DefaultValuePipe(0), ParseIntPipe) delayMs: number,
    @Body() { idDev, idSquad }: ChangeSquadBodyDto,
  ): Promise<ChangeSquadResultDto> {
    const devs = await this.devsStore.getAll();
    const dev = devs.find((el) => el.id === idDev);
    if (!dev) {
      throw new NotFoundException('Dev not found');
    }

    const squads = await this.squadsStore.getAll();
    const squad = squads.find((el) => el.id === idSquad);
    if (!squad) {
      throw new NotFoundException('Squad not found');
    }

    dev.idSquad = squad.id;
    await this.devsStore.update(dev);

    if (delayMs !== 0) {
      await delay(delayMs);
    }

    return { result: `${dev.firstName} moved to squad ${squad.name}` };
  }

  @Post('by-squads')
  @ApiRoute({
    summary: 'Get developers belonging to one or several squads',
    description: 'Retrieves the developers belonging to a set of squads',
    ok: {
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
  async getDevelopersBySquads(
    @Query('delayMs', new DefaultValuePipe(0), ParseIntPipe) delayMs: number,
    @Body() { idSquads }: DevelopersBySquadsBodyDto,
  ): Promise<DevelopersBySquadsResultDto> {
    const devs = await this.devsStore.getAll();

    if (delayMs !== 0) {
      await delay(delayMs);
    }

    return { result: devs.filter((dev) => idSquads.includes(dev.idSquad)) };
  }
}
