import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import type { CreatePlanDTO } from './dtos/create-plan.dto';
import { JwtAuthGuard } from 'src/auth/infra/jwt/guards/jwt.auth-guard';
import { CreatePlanUseCase } from './use-cases/create-plan.use-case';

@Controller('plan')
export class PlanController {
  constructor(private createPlanUseCase: CreatePlanUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: CreatePlanDTO) {
    await this.createPlanUseCase.handle(data);
    return {
      message: 'Plan successfully created',
    };
  }
}
