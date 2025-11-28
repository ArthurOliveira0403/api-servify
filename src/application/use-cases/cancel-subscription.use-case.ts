import { Inject, Injectable } from '@nestjs/common';
import {
  SUBSCRIPTION_REPOSITORY,
  type SubscriptionRepository,
} from 'src/domain/repositories/subscription.repository';
import { CancelSubscriptionDTO } from '../dtos/cancel-subscription.dto';

@Injectable()
export class CancelSubscriptionUseCase {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY)
    private subscriptionRepository: SubscriptionRepository,
  ) {}

  async handle(data: CancelSubscriptionDTO) {
    await this.subscriptionRepository.cancel(data.subscriptionId);
  }
}
