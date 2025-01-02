import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  ParseIntPipe,
} from '@nestjs/common';

@Injectable()
export class ParsePositiveIntegerPipe extends ParseIntPipe {
  constructor(private message: string | string[]) {
    super();
  }

  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    try {
      const transformed = await super.transform(value, metadata);
      if (transformed <= 0) {
        throw new BadRequestException({
          error: 'Bad Request',
          message: 'Expecting a positive integer',
          statusCode: 400,
        });
      }

      return transformed;
    } catch (_error) {
      throw new BadRequestException({
        error: 'Bad Request',
        message: this.message,
        statusCode: 400,
      });
    }
  }
}
