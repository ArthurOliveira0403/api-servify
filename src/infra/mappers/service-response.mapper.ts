import { Service } from 'src/domain/entities/service';
import { PriceConverter } from '../../application/common/price-converter.common';

export class ServiceReponseMapper {
  static unique(service: Service) {
    return {
      id: service.id,
      name: service.name,
      basePrice: PriceConverter.toResponse(service.basePrice),
      description: service.description,
    };
  }

  static various(services: Service[]) {
    const list = services.forEach((s) => this.unique(s));
    return list;
  }
}
