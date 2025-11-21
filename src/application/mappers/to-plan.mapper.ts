import { Plan } from '../../domain/entities/plan';

export class toPlanMapper {
  static handle(plan: Plan) {
    return {
      id: plan.id,
      name: plan.name,
      type: plan.type,
      price: plan.price,
      description: plan.description,
    };
  }
}
