import { Module } from '@nestjs/common';

import { DalModule } from './dal/dal.module';
import { DevsController } from './devs/devs.controller';
import { SquadsController } from './squads/squads.controller';

@Module({
  imports: [DalModule],
  controllers: [SquadsController, DevsController],
})
export class AppModule {}
