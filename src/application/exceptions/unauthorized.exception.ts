import { ApplicationException } from './application-exceptions';

export class UnauthorizedException extends ApplicationException {
  constructor(
    internalMessage: string,
    externalMessage: string,
    context: string,
  ) {
    super(internalMessage, externalMessage, context);
    this.name = UnauthorizedException.name;
  }
}
