import { Module } from '@nestjs/common';
import { PlanController } from './plan.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreatePlanUseCase } from './use-cases/create-plan.use-case';
import { PLAN_REPOSITORY } from './repository/plan.repository';
import { PrismaPlanRepository } from './repository/prisma-plan.repository';
import { ListOnePlanUseCase } from './use-cases/list-one-plan.use-case';
import { ListPlansUseCase } from './use-cases/list-all-plans.use-case';
import { UpdatePlanUseCase } from './use-cases/update-plan.use-case';

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
})
export class PlanModule {}
