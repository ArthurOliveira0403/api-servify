import {
  SERVICE_REPOSITORY,
  type ServiceRespository,
} from 'src/domain/repositories/service.repository';
import { CreateServiceDTO } from '../dtos/create-service.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from 'src/domain/entities/service';

import { PriceConverter } from '../common/price-converter.common';

@Injectable()
export class CreateServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private serviceRepository: ServiceRespository,
  ) {}

  async handle(data: CreateServiceDTO, companyId: string) {
    const basePrice = PriceConverter.toRepository(data.basePrice);

    const service = new Service({
      companyId: companyId,
      name: data.name,
      description: data.description,
      basePrice,
    });

    await this.serviceRepository.save(service);
  }
}
