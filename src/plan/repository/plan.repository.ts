import { Plan } from '../entities/plan';

export const PLAN_REPOSITORY = 'PLAN_REPOSITORY';

export interface PlanRepository {
  save(plan: Plan): Promise<void>;
  findAll(): Promise<Plan[] | []>;
  findByName(name: string): Promise<Plan | null>;
  findById(id: string): Promise<Plan | null>;
  update(plan: Plan): Promise<void>;
}
