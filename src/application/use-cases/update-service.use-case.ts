import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  SERVICE_REPOSITORY,
  type ServiceRespository,
} from 'src/domain/repositories/service.repository';
import { UpdateServiceDTO } from '../dtos/update-service.dto';
import { PriceConverter } from '../common/price-converter.common';

@Injectable()
export class UpdateServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private serviceRepository: ServiceRespository,
  ) {}

  async handle(serviceId: string, data: UpdateServiceDTO) {
    const service = await this.serviceRepository.findById(serviceId);
    if (!service) throw new NotFoundException('Service not found');

    const basePrice = data.basePrice
      ? PriceConverter.toRepository(data.basePrice)
      : undefined;

    service.update({
      ...data,
      basePrice,
    });

    await this.serviceRepository.update(service);

    const serviceUpdated = await this.serviceRepository.findById(serviceId);
    return serviceUpdated ?? null;
  }
}
