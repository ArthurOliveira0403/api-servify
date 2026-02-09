import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthAdminGuard } from 'src/infra/jwt/guards/jwt-auth-admin.guard';
import { CreatePlanUseCase } from '../../../application/use-cases/create-plan.use-case';
import { ListOnePlanUseCase } from '../../../application/use-cases/list-one-plan.use-case';
import { ListPlansUseCase } from '../../../application/use-cases/list-all-plans.use-case';
import { UpdatePlanUseCase } from '../../../application/use-cases/update-plan.use-case';
import {
  createPlanBodySchema,
  type CreatePlanBodyDTO,
} from 'src/infra/schemas/create-plan.schemas';
import { Zod } from 'src/infra/decorators/zod-decorator';
import {
  type ListOnePlanParamDTO,
  listOnePlanParamSchema,
} from 'src/infra/schemas/list-one-plan.schemas';
import {
  type UpdatePlanBodyDTO,
  updatePlanBodySchema,
  type UpdatePlanParamDTO,
  updatePlanParamSchema,
} from 'src/infra/schemas/update-plan.schemas';
import { PlanResponseMapper } from '../mappers/plan-response.mapper';

@Controller('plan')
export class PlanController {
  constructor(
    private createPlanUseCase: CreatePlanUseCase,
    private listOnePlanUseCase: ListOnePlanUseCase,
    private listPlansUseCase: ListPlansUseCase,
    private updatePlanUseCase: UpdatePlanUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthAdminGuard)
  async create(@Body(Zod(createPlanBodySchema)) data: CreatePlanBodyDTO) {
    const { planId } = await this.createPlanUseCase.handle(data);
    return {
      message: 'Plan successfully created',
      planId,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthAdminGuard)
  async listOne(
    @Param('id', Zod(listOnePlanParamSchema)) id: ListOnePlanParamDTO,
  ) {
    const response = await this.listOnePlanUseCase.handle(id);
    return {
      plan: response,
    };
  }

  @Get()
  @UseGuards(JwtAuthAdminGuard)
  async listAll() {
    const response = await this.listPlansUseCase.handle();
    return {
      plans: response,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthAdminGuard)
  async update(
    @Param('id', Zod(updatePlanParamSchema)) id: UpdatePlanParamDTO,
    @Body(Zod(updatePlanBodySchema)) data: UpdatePlanBodyDTO,
  ) {
    const { plan } = await this.updatePlanUseCase.handle(id, data);
    return {
      message: 'Plan successfully updated',
      plan: PlanResponseMapper.handle(plan),
    };
  }
}
