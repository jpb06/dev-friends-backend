import { ApiProperty } from '@nestjs/swagger';

export class SquadDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  squad: number;
}
