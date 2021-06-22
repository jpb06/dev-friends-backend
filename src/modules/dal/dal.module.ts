import { Module } from '@nestjs/common';

import { DataPullService } from './core/data-pull.service';
import { DataPushService } from './core/data-push.service';
import { DbPathService } from './core/db-path.service';
import { DevsStoreService } from './stores/devs-store.service';
import { SquadsStoreService } from './stores/squads-store.service';

@Module({
  providers: [
    DbPathService,
    DataPullService,
    DataPushService,
    DevsStoreService,
    SquadsStoreService,
  ],
  exports: [DevsStoreService, SquadsStoreService],
})
export class DalModule {}
