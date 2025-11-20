import { PlanType } from '../entities/plan';

export interface UpdatePlanDTO {
  name?: string;
  type?: PlanType;
  price?: number;
  description?: string;
}
