import { Inject, Injectable } from '@nestjs/common';
import {
  SUBSCRIPTION_REPOSITORY,
  type SubscriptionRepository,
} from 'src/domain/repositories/subscription.repository';
import { CancelSubscriptionDTO } from '../dtos/cancel-subscription.dto';
import { NotFoundException } from '../exceptions/not-found.exception';
import {
  DATE_TRANSFORM_SERVICE,
  type DateTransformService,
} from '../services/date-transform.service';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';

@Injectable()
export class CancelSubscriptionUseCase {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY)
    private subscriptionRepository: SubscriptionRepository,
    @Inject(DATE_TRANSFORM_SERVICE)
    private dateTransformService: DateTransformService,
  ) {}

  async handle(data: CancelSubscriptionDTO): Promise<void> {
    const subscription = await this.subscriptionRepository.findById(
      data.subscriptionId,
    );
    if (!subscription)
      throw new NotFoundException(
        'Subscription not found',
        'Subscription was not found',
        CancelSubscriptionUseCase.name,
      );

    if (data.companyId !== subscription.companyId)
      throw new UnauthorizedException(
        'The companyId user not match with the subscription companyId',
        'The Subscription not belong to the company',
        CancelSubscriptionUseCase.name,
      );

    subscription.cancelAtPeriodEnd(this.dateTransformService.nowUTC());

    await this.subscriptionRepository.update(subscription);
  }
}
