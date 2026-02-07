import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SUBSCRIPTION_REPOSITORY } from 'src/domain/repositories/subscription.repository';
import type { SubscriptionRepository } from 'src/domain/repositories/subscription.repository';
import { CreateSubscriptionDTO } from '../dtos/create-subscription.dto';
import { Subscription } from 'src/domain/entities/subscription';
import { PLAN_REPOSITORY } from 'src/domain/repositories/plan.repository';
import type { PlanRepository } from 'src/domain/repositories/plan.repository';
import { PlanType } from 'src/domain/entities/plan';
import { DATE_TRANSFORM_SERVICE } from '../services/date-transform.service';
import type { DateTransformService } from '../services/date-transform.service';

@Injectable()
export class CreateSusbcriptionUseCase {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY)
    private subscriptionRepository: SubscriptionRepository,
    @Inject(PLAN_REPOSITORY)
    private planRepository: PlanRepository,
    @Inject(DATE_TRANSFORM_SERVICE)
    private dateTrasnformService: DateTransformService,
  ) {}

  async handle(
    companyId: string,
    data: CreateSubscriptionDTO,
  ): Promise<Subscription> {
    const subscriptionExist =
      await this.subscriptionRepository.listActiveSubscriptionOfCompany(
        companyId,
      );
    if (subscriptionExist)
      throw new ConflictException('There is already an active subscription');

    const plan = await this.planRepository.findById(data.planId);

    if (!plan) throw new NotFoundException('Plan not found');

    const startDate = this.dateTrasnformService.nowUTC();
    const endDate = this.calculateEndDate(startDate, plan.type);
    const revewalDate = endDate;

    const subscription = new Subscription({
      companyId: companyId,
      planId: data.planId,
      status: 'ACTIVE',
      price: plan.price,
      startDate,
      endDate: endDate,
      renewalDate: revewalDate,
      createdAt: this.dateTrasnformService.nowUTC(),
      updatedAt: this.dateTrasnformService.nowUTC(),
    });

    await this.subscriptionRepository.save(subscription);

    return subscription;
  }

  private calculateEndDate(start: Date, type: PlanType) {
    let endDate: Date;

    switch (type) {
      case 'MONTHLY':
        endDate = this.dateTrasnformService.addMonths(start, 1);
        break;
      case 'YEARLY':
        endDate = this.dateTrasnformService.addYears(start, 1);
        break;
    }

    return endDate;
  }
}
