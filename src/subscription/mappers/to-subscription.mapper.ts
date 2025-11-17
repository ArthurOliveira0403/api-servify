import { Subscription } from '../entities/subscription';

export class toSubscriptionMapper {
  static handle(subscriptions: Subscription[]) {
    const row = subscriptions.map((s) => ({
      id: s.id,
      company_id: s.company_id,
      plan_id: s.plan_id,
      start_date: s.start_date,
      end_date: s.end_state,
      renewal_date: s.renewal_date,
      status: s.status,
    }));

    return row;
  }
}
