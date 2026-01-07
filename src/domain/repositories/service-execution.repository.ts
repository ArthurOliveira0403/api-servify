import { ServiceExecution } from '../entities/service-execution';

export interface ServiceExecutionRepository {
  save(serviceExecution: ServiceExecution): Promise<void>;
  findById(serviceExecutionId: string): Promise<ServiceExecution | null>;
  findManyByCompanyId(companyId: string): Promise<ServiceExecution[] | []>;
  findManyByClientCompanyId(
    clientCompanyId: string,
  ): Promise<ServiceExecution[] | []>;
}
