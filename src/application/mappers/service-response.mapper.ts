import { Service } from 'src/domain/entities/service';
import { PriceConverter } from '../common/price-converter.common';
import { DateTransformService } from '../services/date-transform.service';

export class ServiceReponseMapper {
  static handle(
    service: Service,
    tz: string,
    dateTransform: DateTransformService,
  ) {
    return {
      id: service.id,
      client_id: service.client_id,
      price: PriceConverter.toResponse(service.price),
      description: service.description,
      status: service.status,
      start_at: service.start_at
        ? dateTransform.formatInTimezone(service.start_at, tz)
        : null,
      finished_at: service.finished_at
        ? dateTransform.formatInTimezone(service.finished_at, tz)
        : null,
    };
  }
}
