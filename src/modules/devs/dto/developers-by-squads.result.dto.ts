import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { DevDto } from './dev.dto';

@Exclude()
export class DevelopersBySquadsResultDto {
  @Expose()
  @ApiProperty({ isArray: true, type: DevDto })
  @Type(() => DevDto)
  result: DevDto[];
}
