import { PlanType } from '../../domain/entities/plan';

export interface UpdatePlanDTO {
  name?: string;
  type?: PlanType;
  price?: number;
  description?: string;
}
