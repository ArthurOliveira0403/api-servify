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
import {
  DATE_TRANSFORM,
  type DateTransformService,
} from '../services/date-transform.service';
import { PriceConverter } from '../common/price-converter.common';

@Injectable()
export class CreateServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private serviceRepository: ServiceRespository,
    @Inject(CLIENT_REPOSITORY)
    private clientRepository: ClientRepository,
    @Inject(DATE_TRANSFORM)
    private dateTrasnform: DateTransformService,
  ) {}

  async handle(data: CreateServiceDTO, companyId: string) {
    const clientExist = await this.clientRepository.findByCpf(data.clientCpf);
    if (!clientExist) throw new NotFoundException('Client not found');

    // Converting Service Properties
    const price = PriceConverter.toRepository(data.price);

    let start_at: Date | undefined = undefined;
    let finished_at: Date | undefined = undefined;

    if (data.start_at) start_at = this.dateTrasnform.toUTC(data.start_at);
    if (data.finished_at)
      finished_at = this.dateTrasnform.toUTC(data.finished_at);

    const created_at = this.dateTrasnform.toUTC(new Date());
    const updated_at = this.dateTrasnform.toUTC(new Date());

    const service = new Service({
      client_id: clientExist.id,
      company_id: companyId,
      description: data.description,
      price,
      status: data.status,
      start_at,
      finished_at,
      created_at,
      updated_at,
    });

    await this.serviceRepository.save(service);
  }
}
