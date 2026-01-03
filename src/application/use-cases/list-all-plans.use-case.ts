import { Inject, Injectable } from '@nestjs/common';
import { PlanResponseMapper } from '../../infra/mappers/plan-response.mapper';
import { Plan } from '../../domain/entities/plan';
import { PLAN_REPOSITORY } from 'src/domain/repositories/plan.repository';
import type { PlanRepository } from '../../domain/repositories/plan.repository';

@Injectable()
export class ListPlansUseCase {
  constructor(
    @Inject(PLAN_REPOSITORY)
    private planRepository: PlanRepository,
  ) {}

  async handle() {
    const plans = (await this.planRepository.findAll()).map((p: Plan) =>
      PlanResponseMapper.handle(p),
    );

    return plans;
  }
}
