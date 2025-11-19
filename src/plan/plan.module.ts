import { Module } from '@nestjs/common';
import { PlanController } from './plan.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreatePlanUseCase } from './use-cases/create-plan.use-case';
import { PLAN_REPOSITORY } from './repository/plan.repository';
import { PrismaPlanRepository } from './repository/prisma-plan.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [PlanController],
  providers: [
    CreatePlanUseCase,
    { provide: PLAN_REPOSITORY, useClass: PrismaPlanRepository },
  ],
})
export class PlanModule {}
