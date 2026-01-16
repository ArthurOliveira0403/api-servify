import { ZodError } from 'zod';

export class ZodUtils {
  static formatMessage(error: ZodError): string {
    const message = error.issues
      .map((i) => `${i.path.join('.')}: ${i.message}`)
      .join('; \n');

    return message;
  }
}
