import { Module } from '@nestjs/common';
import { PlanController } from '../http/controllers/plan.controller';
import { DatabaseModule } from 'src/infra/modules/database.module';
import { CreatePlanUseCase } from '../../application/use-cases/create-plan.use-case';
import { PLAN_REPOSITORY } from '../../domain/repositories/plan.repository';
import { PrismaPlanRepository } from '../../infra/prisma/repositories/prisma-plan.repository';
import { ListOnePlanUseCase } from '../../application/use-cases/list-one-plan.use-case';
import { ListPlansUseCase } from '../../application/use-cases/list-all-plans.use-case';
import { UpdatePlanUseCase } from '../../application/use-cases/update-plan.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [PlanController],
  providers: [
    CreatePlanUseCase,
    ListOnePlanUseCase,
    ListPlansUseCase,
    UpdatePlanUseCase,
    { provide: PLAN_REPOSITORY, useClass: PrismaPlanRepository },
  ],
  exports: [PLAN_REPOSITORY],
})
export class PlanModule {}
