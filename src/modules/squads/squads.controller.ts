import { ApiRoute } from '@decorators/api-route';
import { DevsStoreService } from '@modules/dal/stores/devs-store.service';
import { SquadsStoreService } from '@modules/dal/stores/squads-store.service';
import { Param, ParseIntPipe } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DevDto } from '@type/dto/dev.dto';
import { SquadDto } from '@type/dto/squad.dto';

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
      type: [SquadDto],
      description: 'The available squads',
    },
  })
  async getAllSquads(): Promise<Array<SquadDto>> {
    const squads = await this.squadsStore.getAll();

    return squads;
  }

  @Get(':id/devs')
  @ApiRoute({
    summary: 'Get the developers belonging to a squad',
    description: 'Retrieves the squad developers',
    ok: {
      type: [DevDto],
      description: 'The squad developers',
    },
    notFound: { description: "The requested squad wasn't found" },
    badRequest: {},
  })
  async getSquadsDevelopers(
    @Param('id', new ParseIntPipe()) idSquad: number,
  ): Promise<Array<SquadDto>> {
    const squads = await this.devsStore.getBy(idSquad);

    return squads;
  }
}
