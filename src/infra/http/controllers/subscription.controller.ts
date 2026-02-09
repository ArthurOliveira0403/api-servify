import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateSusbcriptionUseCase } from 'src/application/use-cases/create-subscription.use-case';
import { JwtAuthCompanyGuard } from '../../jwt/guards/jwt-auth-company.guard';
import { ListActiveSubscription } from 'src/application/use-cases/list-active-subscription.use-case';
import { Timezone } from 'src/infra/decorators/timezone.decorator';
import { CancelSubscriptionUseCase } from 'src/application/use-cases/cancel-subscription.use-case';
import {
  createSubscriptionBodySchema,
  type CreateSubscriptionBodyDTO,
} from 'src/infra/schemas/create-subscription.schemas';
import { Zod } from 'src/infra/decorators/zod-decorator';
import {
  type CancelSubscriptionParamDTO,
  cancelSubscriptionsParamSchema,
} from 'src/infra/schemas/cancel-subscription.schemas';
import { CurrentCompanyUser } from 'src/infra/decorators/current-company-user.decorator';
import { ReturnCompanyUser } from 'src/infra/jwt/strategies/returns-jwt-strategy';

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
    @CurrentCompanyUser() user: ReturnCompanyUser,
    @Body(Zod(createSubscriptionBodySchema)) data: CreateSubscriptionBodyDTO,
  ) {
    const { subscriptionId } = await this.createSubscriptionUseCase.handle(
      user.id,
      data,
    );
    return {
      message: 'Subscription succesfully created',
      subscriptionId,
    };
  }

  @Get()
  @UseGuards(JwtAuthCompanyGuard)
  async getStatus(
    @CurrentCompanyUser() user: ReturnCompanyUser,
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
  async cancel(
    @Param('id', Zod(cancelSubscriptionsParamSchema))
    subscriptionId: CancelSubscriptionParamDTO,
  ) {
    await this.cancelSubscriptionUseCase.handle({ subscriptionId });
    return {
      message: 'Successfully subscription canceled',
    };
  }
}
