import { ServiceStatus } from 'src/domain/entities/service';

export interface CreateServiceDTO {
  clientCpf: string;
  description: string;
  price: number;
  status: ServiceStatus;
  start_at?: Date;
  finished_at?: Date;
}
