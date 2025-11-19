import { PlanType } from '../entities/plan';

export interface CreatePlanDTO {
  name: string;
  type: PlanType;
  price: number;
  description: string;
  features: string[];
}
