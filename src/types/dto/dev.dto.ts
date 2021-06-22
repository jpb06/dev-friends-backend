import { ApiProperty } from '@nestjs/swagger';

export class DevDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  squad: number;
}
