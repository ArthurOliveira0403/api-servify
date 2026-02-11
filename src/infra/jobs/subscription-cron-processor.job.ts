import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProcessSubscriptionsRenewalsUseCase } from 'src/application/use-cases/process-subscriptions-renewals.use-case';

@Injectable()
export class SubscriptionCronProcessor {
  constructor(
    private processSubscriptionsRenwalsUseCase: ProcessSubscriptionsRenewalsUseCase,
  ) {}

  @Cron('0 2 * * *')
  async handle() {
    await this.processSubscriptionsRenwalsUseCase.handle();
  }
}
