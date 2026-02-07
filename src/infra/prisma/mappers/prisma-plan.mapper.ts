import { Plan } from 'src/domain/entities/plan';

export class PrismaPlanMapper {
  static toPrisma(plan: Plan) {
    return {
      id: plan.id,
      name: plan.name,
      type: plan.type,
      price: plan.price,
      description: plan.description,
      created_at: plan.createdAt,
      updated_at: plan.updatedAt,
    };
  }
}
