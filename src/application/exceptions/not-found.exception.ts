import { ApplicationException } from './application-exceptions';

export class NotFoundException extends ApplicationException {
  constructor(
    internalMessage: string,
    externalMessage: string,
    context: string,
  ) {
    super(internalMessage, externalMessage, context);
    this.name = NotFoundException.name;
  }
}
