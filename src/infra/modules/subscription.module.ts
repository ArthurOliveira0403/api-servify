import { Module } from '@nestjs/common';
import { SubscriptionController } from '../http/controllers/subscription.controller';

@Module({
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
