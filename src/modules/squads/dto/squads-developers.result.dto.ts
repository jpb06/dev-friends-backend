import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { DevDto } from '../../devs/dto/dev.dto';

@Exclude()
export class SquadsDevelopersResultDto {
  @Expose()
  @ApiProperty({ isArray: true, type: DevDto })
  @Type(() => DevDto)
  result: DevDto[];
}
