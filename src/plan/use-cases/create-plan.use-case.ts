import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreatePlanDTO } from '../dtos/create-plan.dto';
import {
  PLAN_REPOSITORY,
  type PlanRepository,
} from '../repository/plan.repository';
import { Plan } from '../entities/plan';

@Injectable()
export class CreatePlanUseCase {
  constructor(
    @Inject(PLAN_REPOSITORY)
    private planRepository: PlanRepository,
  ) {}

  async handle(data: CreatePlanDTO) {
    const existPlan = await this.planRepository.findByName(data.name);

    if (existPlan) throw new ConflictException('The Plan already exist');

    const plan = new Plan({
      name: data.name,
      type: data.type,
      price: data.price,
      description: data.description,
    });

    await this.planRepository.save(plan);
  }
}
