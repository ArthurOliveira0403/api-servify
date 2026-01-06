import { Service } from 'src/domain/entities/service';
import { PriceConverter } from '../../application/common/price-converter.common';
import { DateTransformService } from '../../application/services/date-transform.service';

export class ServiceReponseMapper {
  static unique(
    service: Service,
    tz: string,
    dateTransform: DateTransformService,
  ) {
    return {
      id: service.id,
      clientId: service.clientId,
      price: PriceConverter.toResponse(service.price),
      description: service.description,
      status: service.status,
      startAt: service.startAt
        ? dateTransform.formatInTimezone(service.startAt, tz)
        : null,
      finishedAt: service.finishedAt
        ? dateTransform.formatInTimezone(service.finishedAt, tz)
        : null,
    };
  }

  static various(
    services: Service[],
    tz: string,
    dateTransform: DateTransformService,
  ) {
    const list = services.forEach((s) => this.unique(s, tz, dateTransform));
    return list;
  }
}
