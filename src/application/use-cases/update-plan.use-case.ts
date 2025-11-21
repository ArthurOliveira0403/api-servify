import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { PLAN_REPOSITORY } from 'src/domain/repositories/plan.repository';
import type { PlanRepository } from 'src/domain/repositories/plan.repository';
import { UpdatePlanDTO } from '../dtos/update-plan.dto';
import { toPlanMapper } from '../mappers/to-plan.mapper';
import { Plan } from '../../domain/entities/plan';

export class UpdatePlanUseCase {
  constructor(
    @Inject(PLAN_REPOSITORY)
    private planRepository: PlanRepository,
  ) {}

  async handle(id: string, data: UpdatePlanDTO) {
    const planExist = await this.planRepository.findById(id);

    if (!id) throw new BadRequestException('ID não informado');

    if (!planExist) throw new NotFoundException('Plan not found');

    planExist.update(data);

    await this.planRepository.update(planExist);

    const planUpdated = await this.planRepository.findById(id);

    return toPlanMapper.handle(planUpdated as unknown as Plan);
  }
}
