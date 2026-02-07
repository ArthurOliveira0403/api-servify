import { Subscription } from '../../../domain/entities/subscription';
import { PriceConverter } from '../../../application/common/price-converter.common';
import { DateTransformService } from '../../../application/services/date-transform.service';

export class SubscriptionResponseMapper {
  static One(
    subscription: Subscription,
    tz: string,
    dateTransform: DateTransformService,
  ) {
    return {
      id: subscription.id,
      price: PriceConverter.toResponse(subscription.price),
      status: subscription.status,
      startDate: dateTransform.formatInTimezone(subscription.startDate, tz),
      endDate: dateTransform.formatInTimezone(subscription.endDate, tz),
      renewalDate: dateTransform.formatInTimezone(subscription.renewalDate, tz),
    };
  }

  static list(
    subscriptions: Subscription[],
    tz: string,
    dateTransform: DateTransformService,
  ) {
    const row = subscriptions.map((s) => this.One(s, tz, dateTransform));

    return row;
  }
}
