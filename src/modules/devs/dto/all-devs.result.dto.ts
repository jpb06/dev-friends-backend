import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { DevDto } from './dev.dto';

import { PaginatedResponseDto } from '@decorators/dto/paginated-response.dto';

@Exclude()
export class AllDevsResultDto extends PaginatedResponseDto {
  @Expose()
  @ApiProperty({ isArray: true, type: DevDto })
  @Type(() => DevDto)
  result: DevDto[];
}
