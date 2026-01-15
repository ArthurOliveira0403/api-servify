import { PlanType } from '../../domain/entities/plan';

export abstract class CreatePlanDTO {
  name: string;
  type: PlanType;
  price: number;
  description: string;
}
