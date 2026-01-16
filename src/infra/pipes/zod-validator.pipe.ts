import { PipeTransform } from '@nestjs/common';
import { ZodUtils } from '../utils/zod.utils';
import z, { ZodType } from 'zod';
import { ZodValidatorPipeException } from '../exceptions/zod-validator-pipe.exception';

export class ZodValidatorPipe implements PipeTransform {
  constructor(private readonly schema: ZodType) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);

      return parsedValue;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message = ZodUtils.formatMessage(error);

        throw new ZodValidatorPipeException(
          `Error while validatiing request: ${message}`,
          `The request data is invalid: ${message}`,
          ZodValidatorPipe.name,
        );
      }
    }
  }
}
