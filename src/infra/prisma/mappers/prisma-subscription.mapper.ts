import { Subscription } from 'src/domain/entities/subscription';
import { Subscription as SubPrisma } from '@prisma/client';
import { UtcDate } from '../common/utc-date';

export class PrismaSubscriptionMapper {
  static toPrisma(subscription: Subscription) {
    return {
      id: subscription.id,
      company_id: subscription.companyId,
      plan_id: subscription.planId,
      status: subscription.status,
      price: subscription.price,
      start_date: UtcDate.handle(subscription.startDate),
      end_date: UtcDate.handle(subscription.endDate),
      renewal_date: UtcDate.handle(subscription.renewalDate),
    };
  }

  static toDomain(subscription: SubPrisma): Subscription {
    return new Subscription({
      ...subscription,
      companyId: subscription.company_id,
      planId: subscription.plan_id,
      startDate: subscription.start_date,
      endDate: subscription.end_date,
      renewalDate: subscription.renewal_date,
    });
  }
}
