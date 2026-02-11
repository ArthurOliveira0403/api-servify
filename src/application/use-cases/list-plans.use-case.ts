import { Inject, Injectable } from '@nestjs/common';
import {
  PLAN_REPOSITORY,
  type PlanRepository,
} from 'src/domain/repositories/plan.repository';
import { NotFoundException } from '@nestjs/common';
import { ListOnePlanDTO } from '../dtos/list-plans.dto';
import { Plan } from 'src/domain/entities/plan';
import { PriceConverter } from '../common/price-converter.common';

@Injectable()
export class ListPlansUseCase {
  constructor(
    @Inject(PLAN_REPOSITORY)
    private planRepository: PlanRepository,
  ) {}

  async one(data: ListOnePlanDTO): Promise<{ plan: Plan }> {
    const planExists = await this.planRepository.findById(data.planId);

    if (!planExists) throw new NotFoundException('Plan not found');

    const plan = new Plan({
      id: planExists.id,
      name: planExists.name,
      type: planExists.type,
      price: PriceConverter.toResponse(planExists.price),
      description: planExists.description,
    });

    return { plan };
  }

  async all(): Promise<{ plans: Plan[] | [] }> {
    const plansExists = await this.planRepository.findAll();

    const plans = plansExists.map((p: Plan) => {
      return new Plan({
        id: p.id,
        name: p.name,
        type: p.type,
        price: PriceConverter.toResponse(p.price),
        description: p.description,
      });
    });

    return { plans };
  }
}
