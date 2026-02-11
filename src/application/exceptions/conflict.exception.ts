import { ApplicationException } from './application-exceptions';

export class ConflictException extends ApplicationException {
  constructor(
    internalMessage: string,
    externalMessage: string,
    context: string,
  ) {
    super(internalMessage, externalMessage, context);
    this.name = ConflictException.name;
  }
}
