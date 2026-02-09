import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { PLAN_REPOSITORY } from 'src/domain/repositories/plan.repository';
import type { PlanRepository } from 'src/domain/repositories/plan.repository';
import { UpdatePlanDTO } from '../dtos/update-plan.dto';
import { Plan } from '../../domain/entities/plan';
import {
  DATE_TRANSFORM_SERVICE,
  type DateTransformService,
} from '../services/date-transform.service';

export class UpdatePlanUseCase {
  constructor(
    @Inject(PLAN_REPOSITORY)
    private planRepository: PlanRepository,
    @Inject(DATE_TRANSFORM_SERVICE)
    private dateTransformService: DateTransformService,
  ) {}

  async handle(id: string, data: UpdatePlanDTO): Promise<{ plan: Plan }> {
    const planExist = await this.planRepository.findById(id);

    if (!id) throw new BadRequestException('ID não informado');

    if (!planExist) throw new NotFoundException('Plan not found');

    planExist.update({
      ...data,
      updatedAt: this.dateTransformService.nowUTC(),
    });

    await this.planRepository.update(planExist);

    const planUpdated = await this.planRepository.findById(id);

    return { plan: planUpdated! };
  }
}
