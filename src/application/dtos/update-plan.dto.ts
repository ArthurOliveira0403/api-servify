import { PlanType } from '../../domain/entities/plan';

export abstract class UpdatePlanDTO {
  name?: string;
  type?: PlanType;
  price?: number;
  description?: string;
}
