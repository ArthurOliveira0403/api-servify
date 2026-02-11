import { DomainException } from '../../common/domain-exception';

export class SubscriptionException extends DomainException {
  constructor(
    internalMessage: string,
    externalMessage: string,
    context: string,
  ) {
    super(internalMessage, externalMessage, context);
    this.name = SubscriptionException.name;
  }
}
