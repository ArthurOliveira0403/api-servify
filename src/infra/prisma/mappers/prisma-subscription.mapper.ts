import { Subscription } from 'src/domain/entities/subscription';
import { Subscription as SubPrisma } from '@prisma/client';

export class PrismaSubscriptionMapper {
  static toPrisma(subscription: Subscription) {
    return {
      id: subscription.id,
      company_id: subscription.company_id,
      plan_id: subscription.plan_id,
      status: subscription.status,
      price: subscription.price,
      start_date: subscription.start_date,
      end_date: subscription.end_date,
      renewal_date: subscription.renewal_date,
    };
  }

  static toDomain(raw: SubPrisma): Subscription {
    return new Subscription({
      id: raw.id,
      company_id: raw.company_id,
      plan_id: raw.plan_id,
      status: raw.status,
      price: Number(raw.price),
      start_date: raw.start_date,
      end_date: raw.end_date,
      renewal_date: raw.renewal_date,
    });
  }
}
