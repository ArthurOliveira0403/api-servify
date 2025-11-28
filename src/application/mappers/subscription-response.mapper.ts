import { Subscription } from '../../domain/entities/subscription';
import { PriceConverter } from '../common/price-converter.common';
import { DateTransformService } from '../services/date-transform.service';

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
      start_date: dateTransform.formatInTimezone(subscription.start_date, tz),
      end_date: dateTransform.formatInTimezone(subscription.end_date, tz),
      renewal_date: dateTransform.formatInTimezone(
        subscription.renewal_date,
        tz,
      ),
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
