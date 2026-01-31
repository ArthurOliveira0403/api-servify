import { Inject, Injectable } from '@nestjs/common';
import { Subscription } from 'src/domain/entities/subscription';
import { SUBSCRIPTION_REPOSITORY } from 'src/domain/repositories/subscription.repository';
import type { SubscriptionRepository } from 'src/domain/repositories/subscription.repository';
import { DATE_TRANSFORM_SERVICE } from '../services/date-transform.service';
import type { DateTransformService } from '../services/date-transform.service';
import { SubscriptionResponseMapper } from '../../infra/mappers/subscription-response.mapper';
import { ListActiveSubscriptionDTO } from '../dtos/list-active-subscription.dto';

@Injectable()
export class ListActiveSubscription {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY)
    private subscriptionRepository: SubscriptionRepository,
    @Inject(DATE_TRANSFORM_SERVICE)
    private dateTransform: DateTransformService,
  ) {}

  async handle(data: ListActiveSubscriptionDTO) {
    const subscriptionExist =
      await this.subscriptionRepository.listActiveSubscriptionOfCompany(
        data.companyId,
      );

    if (!subscriptionExist) return null;

    const subscription = new Subscription({
      id: subscriptionExist.id,
      companyId: subscriptionExist.companyId,
      planId: subscriptionExist.planId,
      price: subscriptionExist.price,
      status: subscriptionExist.status,
      startDate: subscriptionExist.startDate,
      endDate: subscriptionExist.endDate,
      renewalDate: subscriptionExist.renewalDate,
    });

    return SubscriptionResponseMapper.One(
      subscription,
      data.tz,
      this.dateTransform,
    );
  }
}
