import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateSusbcriptionUseCase } from 'src/application/use-cases/create-subscription.use-case';
import { CurrentUser } from 'src/infra/decorators/current-user.decorator';
import { JwtAuthCompanyGuard } from '../../jwt/guards/jwt-auth-company.guard';
import type { CreateSubscriptionDTO } from 'src/application/dtos/create-subscription.dto';
import type { ReturnJwtStrategy } from 'src/infra/jwt/strategies/return-jwt-strategy';
import { ListActiveSubscription } from 'src/application/use-cases/list-active-subscription.use-case';
import { Timezone } from 'src/infra/decorators/timezone.decorator';
import { CancelSubscriptionUseCase } from 'src/application/use-cases/cancel-subscription.use-case';
import type { CancelSubscriptionDTO } from 'src/application/dtos/cancel-subscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(
    private listActiveSubscriptionUseCase: ListActiveSubscription,
    private createSubscriptionUseCase: CreateSusbcriptionUseCase,
    private cancelSubscriptionUseCase: CancelSubscriptionUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthCompanyGuard)
  async create(
    @CurrentUser() user: ReturnJwtStrategy,
    @Body() data: CreateSubscriptionDTO,
  ) {
    await this.createSubscriptionUseCase.handle(user.id, data);
    return {
      message: 'Subscription succesfully created',
    };
  }

  @Get()
  @UseGuards(JwtAuthCompanyGuard)
  async getStatus(
    @CurrentUser() user: ReturnJwtStrategy,
    @Timezone() tz: string,
  ) {
    const subscription = await this.listActiveSubscriptionUseCase.handle({
      companyId: user.id,
      tz,
    });
    return {
      subscription,
    };
  }

  @Post('cancel')
  @UseGuards(JwtAuthCompanyGuard)
  async cancel(@Body() data: CancelSubscriptionDTO) {
    await this.cancelSubscriptionUseCase.handle(data);
    console.log(data.subscriptionId);
    return {
      message: 'Successfully subscription canceled',
    };
  }
}
