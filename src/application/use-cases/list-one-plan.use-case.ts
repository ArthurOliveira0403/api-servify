import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  PLAN_REPOSITORY,
  type PlanRepository,
} from 'src/domain/repositories/plan.repository';
import { NotFoundException } from '@nestjs/common';
import { PlanResponseMapper } from '../../infra/mappers/plan-response.mapper';

@Injectable()
export class ListOnePlanUseCase {
  constructor(
    @Inject(PLAN_REPOSITORY)
    private planRepository: PlanRepository,
  ) {}

  async handle(id?: string) {
    if (!id) throw new BadRequestException('Invalid ID');

    const plan = await this.planRepository.findById(id);

    if (!plan) throw new NotFoundException('Plan not found');

    return PlanResponseMapper.handle(plan);
  }
}
