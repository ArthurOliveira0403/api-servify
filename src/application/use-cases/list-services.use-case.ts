import { Inject } from '@nestjs/common';
import {
  SERVICE_REPOSITORY,
  type ServiceRespository,
} from 'src/domain/repositories/service.repository';
import { ServiceReponseMapper } from '../mappers/service-response.mapper';
import { ListServicesDTO } from '../dtos/list-services.dto';
import {
  DATE_TRANSFORM,
  type DateTransformService,
} from '../services/date-transform.service';
import { Service } from 'src/domain/entities/service';

export class ListServicesUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private serviceRepository: ServiceRespository,
    @Inject(DATE_TRANSFORM)
    private dateTrasnform: DateTransformService,
  ) {}

  async handle(data: ListServicesDTO) {
    const services = await this.serviceRepository.findManyByCompany(
      data.companyId,
    );

    if (!services) return [];

    return services.map((s: Service) =>
      ServiceReponseMapper.handle(s, data.timezone, this.dateTrasnform),
    );
  }
}
