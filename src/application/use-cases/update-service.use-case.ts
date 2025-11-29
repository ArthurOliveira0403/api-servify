import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  SERVICE_REPOSITORY,
  type ServiceRespository,
} from 'src/domain/repositories/service.repository';
import { UpdateServiceDTO } from '../dtos/update-service.dto';
import {
  DATE_TRANSFORM,
  type DateTransformService,
} from '../services/date-transform.service';
import { PriceConverter } from '../common/price-converter.common';
import { ServiceReponseMapper } from '../mappers/service-response.mapper';

@Injectable()
export class UpdateServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private serviceRepository: ServiceRespository,
    @Inject(DATE_TRANSFORM)
    private dateTrasnform: DateTransformService,
  ) {}

  async handle(data: UpdateServiceDTO, serviceId: string, tz: string) {
    const service = await this.serviceRepository.findById(serviceId);
    if (!service) throw new NotFoundException('Service not found');

    // Converting service properties
    let price: number | undefined = undefined;
    let start_at: Date | undefined = undefined;
    let finished_at: Date | undefined = undefined;
    if (data.price) price = PriceConverter.toRepository(data.price);
    if (data.start_at) start_at = this.dateTrasnform.toUTC(data.start_at);
    if (data.finished_at)
      finished_at = this.dateTrasnform.toUTC(data.finished_at);

    service.update({
      description: data.description ?? undefined,
      status: data.status ?? undefined,
      price,
      start_at,
      finished_at,
    });

    await this.serviceRepository.update(service);

    const serviceUpdated = await this.serviceRepository.findById(serviceId);
    return ServiceReponseMapper.handle(serviceUpdated!, tz, this.dateTrasnform);
  }
}
