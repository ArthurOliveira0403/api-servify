import { Inject } from '@nestjs/common';
import {
  SERVICE_REPOSITORY,
  type ServiceRespository,
} from 'src/domain/repositories/service.repository';
import { ListServicesDTO } from '../dtos/list-services.dto';
import { Service } from 'src/domain/entities/service';

export class ListServicesUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private serviceRepository: ServiceRespository,
  ) {}

  async handle(data: ListServicesDTO) {
    const services = await this.serviceRepository.findManyByCompany(
      data.companyId,
    );

    return (services as Service[]) ?? [];
  }
}
