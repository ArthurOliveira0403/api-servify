import {
  SERVICE_REPOSITORY,
  type ServiceRespository,
} from 'src/domain/repositories/service.repository';
import { CreateServiceDTO } from '../dtos/create-service.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CLIENT_REPOSITORY,
  type ClientRepository,
} from 'src/domain/repositories/client.repository';
import { Service } from 'src/domain/entities/service';

import { PriceConverter } from '../common/price-converter.common';

@Injectable()
export class CreateServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private serviceRepository: ServiceRespository,
    @Inject(CLIENT_REPOSITORY)
    private clientRepository: ClientRepository,
  ) {}

  async handle(data: CreateServiceDTO, companyId: string) {
    const clientExist = await this.clientRepository.findByCpf(data.clientCpf);
    if (!clientExist) throw new NotFoundException('Client not found');

    const price = PriceConverter.toRepository(data.price);

    const service = new Service({
      client_id: clientExist.id,
      company_id: companyId,
      description: data.description,
      price,
      status: data.status,
      start_at: data.start_at,
      finished_at: data.finished_at,
    });

    await this.serviceRepository.save(service);
  }
}
