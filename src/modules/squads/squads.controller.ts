import { Param, ParseIntPipe } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiRoute } from '@decorators/api-route';
import { DevsStoreService } from '@modules/dal/stores/devs-store.service';
import { SquadsStoreService } from '@modules/dal/stores/squads-store.service';

import { AllSquadsResultDto } from './dto/all-squads.result.dto';
import { SquadsDevelopersResultDto } from './dto/squads-developers.result.dto';

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
  async getAllSquads(): Promise<AllSquadsResultDto> {
    const squads = await this.squadsStore.getAll();

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
  async getSquadsDevelopers(
    @Param('id', new ParseIntPipe()) idSquad: number,
  ): Promise<SquadsDevelopersResultDto> {
    const devs = await this.devsStore.getBy(idSquad);

    return { result: devs };
  }
}
