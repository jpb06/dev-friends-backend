import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiRoute } from '@decorators/api-route';
import { DevsStoreService } from '@modules/dal/stores/devs-store.service';
import { SquadsStoreService } from '@modules/dal/stores/squads-store.service';

import { AllDevsResultDto } from './dto/all-devs.result.dto';
import { ChangeSquadBodyDto } from './dto/change-squad.body.dto';
import { ChangeSquadResultDto } from './dto/change-squad.result.dto';
import { DevelopersBySquadsBodyDto } from './dto/developers-by-squads.body.dto';
import { DevelopersBySquadsResultDto } from './dto/developers-by-squads.result.dto';

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
  async getAllDevelopers(): Promise<AllDevsResultDto> {
    const devs = await this.devsStore.getAll();

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
  async changeDeveloperSquad(
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
  async getDevelopersBySquads(
    @Body() { idSquads }: DevelopersBySquadsBodyDto,
  ): Promise<DevelopersBySquadsResultDto> {
    const devs = await this.devsStore.getAll();

    return { result: devs.filter((dev) => idSquads.includes(dev.idSquad)) };
  }
}
