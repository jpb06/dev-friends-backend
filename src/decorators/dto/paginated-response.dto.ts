import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaginatedResponseDto {
  @Expose()
  @ApiPropertyOptional()
  PreviousPage?: number;

  @Expose()
  @ApiProperty()
  currentPage: number;

  @Expose()
  @ApiPropertyOptional()
  nextPage?: number;

  @Expose()
  @ApiProperty()
  lastPage: number;
}
