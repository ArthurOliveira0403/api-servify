import { TypeConverter } from 'src/infra/prisma/helpers/type-converter.helper';
import { Plan } from 'src/domain/entities/plan';

export class PrismaPlanMapper {
  static toPrisma(plan: Plan) {
    return {
      id: plan.id,
      name: plan.name,
      type: TypeConverter.toPrisma(plan.type),
      price: plan.price,
      description: plan.description,
    };
  }
}
