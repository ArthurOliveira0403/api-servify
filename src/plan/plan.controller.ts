import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import type { CreatePlanDTO } from './dtos/create-plan.dto';
import { JwtAuthGuard } from 'src/auth/infra/jwt/guards/jwt.auth-guard';
import { CreatePlanUseCase } from './use-cases/create-plan.use-case';
import { ListOnePlanUseCase } from './use-cases/list-one-plan.use-case';
import { ListPlansUseCase } from './use-cases/list-all-plans.use-case';

@Controller('plan')
export class PlanController {
  constructor(
    private createPlanUseCase: CreatePlanUseCase,
    private listOnePlanUseCase: ListOnePlanUseCase,
    private listPlansUseCase: ListPlansUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: CreatePlanDTO) {
    await this.createPlanUseCase.handle(data);
    return {
      message: 'Plan successfully created',
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async listOne(@Param('id') id: string) {
    const response = await this.listOnePlanUseCase.handle(id);
    return {
      plan: response,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listAll() {
    const response = await this.listPlansUseCase.handle();
    return {
      plans: response,
    };
  }
}
