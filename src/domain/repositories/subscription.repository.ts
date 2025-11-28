import { Subscription } from '../entities/subscription';

export const SUBSCRIPTION_REPOSITORY = 'SUBSCRIPTION_REPOSITORY';

export interface SubscriptionRepository {
  save(subscription: Subscription): Promise<void>;
  findByCompanyId(companyId: string): Promise<Subscription[] | []>;
  listActiveSubscriptionOfCompany(
    companyId: string,
  ): Promise<Subscription | null>;
  cancel(subscriptionId: string): Promise<void>;
}
