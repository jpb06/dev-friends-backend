import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DevelopersBySquadsBodyDto {
  @ApiProperty({
    type: [Number],
  })
  @IsNumber({}, { each: true })
  idSquads: number[];
}
