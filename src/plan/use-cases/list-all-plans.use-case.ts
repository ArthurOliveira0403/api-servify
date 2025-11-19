import { Inject, Injectable } from '@nestjs/common';
import {
  PLAN_REPOSITORY,
  type PlanRepository,
} from '../repository/plan.repository';
import { toPlanMapper } from '../mappers/to-plan.mapper';
import { Plan } from '../entities/plan';

@Injectable()
export class ListPlansUseCase {
  constructor(
    @Inject(PLAN_REPOSITORY)
    private planRepository: PlanRepository,
  ) {}

  async handle() {
    const plans = (await this.planRepository.findAll()).map((p: Plan) =>
      toPlanMapper.handle(p),
    );

    return plans;
  }
}
