import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ChangeSquadBodyDto {
  @ApiProperty()
  @IsNumber()
  idDev: number;

  @ApiProperty()
  @IsNumber()
  idSquad: number;
}
