import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import type { CreatePlanDTO } from '../../../application/dtos/create-plan.dto';
import { JwtAuthGuard } from 'src/infra/jwt/guards/jwt.auth-guard';
import { CreatePlanUseCase } from '../../../application/use-cases/create-plan.use-case';
import { ListOnePlanUseCase } from '../../../application/use-cases/list-one-plan.use-case';
import { ListPlansUseCase } from '../../../application/use-cases/list-all-plans.use-case';
import type { UpdatePlanDTO } from '../../../application/dtos/update-plan.dto';
import { UpdatePlanUseCase } from '../../../application/use-cases/update-plan.use-case';

@Controller('plan')
export class PlanController {
  constructor(
    private createPlanUseCase: CreatePlanUseCase,
    private listOnePlanUseCase: ListOnePlanUseCase,
    private listPlansUseCase: ListPlansUseCase,
    private updatePlanUseCase: UpdatePlanUseCase,
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

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() data: UpdatePlanDTO) {
    const response = await this.updatePlanUseCase.handle(id, data);
    return {
      message: 'Plan successfully updated',
      plan: response,
    };
  }
}
