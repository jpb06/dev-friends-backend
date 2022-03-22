import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ChangeSquadResultDto {
  @Expose()
  @ApiProperty()
  result: string;
}
