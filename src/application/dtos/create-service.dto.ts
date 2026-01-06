import { ServiceStatus } from 'src/domain/entities/service';

export interface CreateServiceDTO {
  clientCpf: string;
  description: string;
  price: number;
  status: ServiceStatus;
  startAt?: Date;
  finishedAt?: Date;
}
