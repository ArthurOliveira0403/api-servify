import { Module } from '@nestjs/common';
import { SubscriptionController } from '../http/controllers/subscription.controller';
import { DatabaseModule } from './database.module';
import { CreateSusbcriptionUseCase } from 'src/application/use-cases/create-subscription.use-case';
import { SUBSCRIPTION_REPOSITORY } from 'src/domain/repositories/subscription.repository';
import { PrismaSubscriptionRepository } from '../prisma/repositories/prisma.subscription.repository';
import { AuthModule } from './auth.module';
import { PlanModule } from './plan.module';
import { DateTrasnformModule } from './date-transform.module';
import { ListActiveSubscription } from 'src/application/use-cases/list-active-subscription.use-case';
import { CancelSubscriptionUseCase } from 'src/application/use-cases/cancel-subscription.use-case';

@Module({
  imports: [DatabaseModule, AuthModule, PlanModule, DateTrasnformModule],
  controllers: [SubscriptionController],
  providers: [
    CreateSusbcriptionUseCase,
    ListActiveSubscription,
    CancelSubscriptionUseCase,
    {
      provide: SUBSCRIPTION_REPOSITORY,
      useClass: PrismaSubscriptionRepository,
    },
  ],
})
export class SubscriptionModule {}
