import { $Enums } from '@prisma/client';
import { PlanType } from 'src/domain/entities/plan';

export class TypeConverter {
  static toPrisma(type: PlanType) {
    switch (type) {
      case PlanType.MONTHLY:
        return $Enums.PlanType.MONTHLY;
      case PlanType.YEARLY:
        return $Enums.PlanType.YEARLY;
    }
  }

  static toReturn(type: $Enums.PlanType) {
    switch (type) {
      case 'MONTHLY':
        return PlanType.MONTHLY;
      case 'YEARLY':
        return PlanType.YEARLY;
    }
  }
}
