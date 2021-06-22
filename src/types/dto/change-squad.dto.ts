import { IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ChangeSquadDto {
  @ApiProperty()
  @IsNumber()
  idDev: number;

  @ApiProperty()
  @IsNumber()
  idSquad: number;
}
