import { Subscription } from '../entities/subscription';

export const SUBSCRIPTION_REPOSITORY = 'SUBSCRIPTION_REPOSITORY';

export interface SubscriptionRepository {
  save(subscription: Subscription): Promise<void>;
  findById(id: string): Promise<Subscription | null>;
  findByCompanyId(companyId: string): Promise<Subscription[] | []>;
  listActiveSubscriptionOfCompany(
    companyId: string,
  ): Promise<Subscription | null>;
  listAll(): Promise<Subscription[] | []>;
  update(subscription: Subscription): Promise<void>;
}
