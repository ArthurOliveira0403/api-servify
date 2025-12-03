import { Service } from '../entities/service';

export const SERVICE_REPOSITORY = 'SERVICE_REPOSITORY';

export interface ServiceRespository {
  save(service: Service): Promise<void>;
  update(service: Service): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Service | null>;
  findManyByCompany(companyId: string): Promise<Service[] | []>;
}
