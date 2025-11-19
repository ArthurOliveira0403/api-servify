import { Plan } from '../entities/plan';

export class toPlanMapper {
  static handle(plan: Plan) {
    return {
      id: plan.id,
      name: plan.name,
      type: plan.type,
      price: plan.price,
      features: plan.features,
      description: plan.description,
    };
  }
}
