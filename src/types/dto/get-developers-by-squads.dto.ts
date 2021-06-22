import { IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class GetDevelopersBySquadsDto {
  @ApiProperty({
    type: [Number],
  })
  @IsNumber({}, { each: true })
  idSquads: number[];
}
