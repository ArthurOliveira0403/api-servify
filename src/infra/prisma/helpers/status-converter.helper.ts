import { $Enums } from '@prisma/client';
import { Status } from 'src/domain/entities/subscription';

export class StatusConverter {
  static handle(status: $Enums.SubscriptionStatus) {
    switch (status) {
      case 'ACTIVE':
        return Status.ACTIVE;
      case 'CANCELED':
        return Status.CANCELED;
      case 'EXPIRED':
        return Status.EXPIRED;
    }
  }
}
