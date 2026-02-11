import { Inject, Injectable } from '@nestjs/common';
import {
  PLAN_REPOSITORY,
  type PlanRepository,
} from 'src/domain/repositories/plan.repository';
import {
  SUBSCRIPTION_REPOSITORY,
  type SubscriptionRepository,
} from 'src/domain/repositories/subscription.repository';
import {
  DATE_TRANSFORM_SERVICE,
  type DateTransformService,
} from '../services/date-transform.service';
import { PlanType } from 'src/domain/entities/plan';

@Injectable()
export class ProcessSubscriptionsRenewalsUseCase {
  constructor(
    @Inject(DATE_TRANSFORM_SERVICE)
    private dateTransformService: DateTransformService,
    @Inject(SUBSCRIPTION_REPOSITORY)
    private subscriptionRepository: SubscriptionRepository,
    @Inject(PLAN_REPOSITORY)
    private planRepository: PlanRepository,
  ) {}

  async handle(): Promise<void> {
    const now = this.dateTransformService.nowUTC();

    const subscriptions = await this.subscriptionRepository.listAll();

    for (const subscription of subscriptions) {
      subscription.checkExpiration(now);

      if (
        subscription.status === 'EXPIRED' &&
        subscription.autoRenew === true
      ) {
        const plan = await this.planRepository.findById(subscription.planId);

        subscription.renew(
          this.calculateEndDate(subscription.renewalDate, plan!.type),
          now,
        );
      }

      await this.subscriptionRepository.update(subscription);
    }
  }

  private calculateEndDate(start: Date, planType: PlanType): Date {
    switch (planType) {
      case 'MONTHLY':
        return this.dateTransformService.addMonths(start, 1);
      case 'YEARLY':
        return this.dateTransformService.addYears(start, 1);
    }
  }
}
