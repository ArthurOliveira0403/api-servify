import { Inject, Injectable } from '@nestjs/common';
import {
  SERVICE_REPOSITORY,
  type ServiceRespository,
} from 'src/domain/repositories/service.repository';

@Injectable()
export class DeleteServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private serviceRepository: ServiceRespository,
  ) {}

  async handle(serviceId: string) {
    await this.serviceRepository.delete(serviceId);
  }
}
