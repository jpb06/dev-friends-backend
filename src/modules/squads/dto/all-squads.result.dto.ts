import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { SquadDto } from './squad.dto';

@Exclude()
export class AllSquadsResultDto {
  @Expose()
  @ApiProperty({ isArray: true, type: SquadDto })
  @Type(() => SquadDto)
  result: SquadDto[];
}
