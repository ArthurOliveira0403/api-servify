import { ServiceStatus } from 'src/domain/entities/service';

export interface UpdateServiceDTO {
  description?: string;
  price?: number;
  status?: ServiceStatus;
  startAt?: Date;
  finishedAt?: Date;
}
