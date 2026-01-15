import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CLIENT_COMPANY_REPOSITORY,
  type ClientCompanyRepository,
} from 'src/domain/repositories/client-company.repository';
import {
  CLIENT_REPOSITORY,
  type ClientRepository,
} from 'src/domain/repositories/client.repository';
import { CreateClientCompanyDTO } from '../dtos/create-client-company.dto';
import { ClientCompany } from 'src/domain/entities/client-company';

@Injectable()
export class CreateClientCompanyUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private clientRepository: ClientRepository,
    @Inject(CLIENT_COMPANY_REPOSITORY)
    private clientCompanyRepository: ClientCompanyRepository,
  ) {}

  async handle(data: CreateClientCompanyDTO): Promise<void> {
    const client = await this.clientRepository.findByInternationalId(
      data.clientInternationalId,
    );
    if (!client) throw new NotFoundException('Client not found');

    const relationExists = await this.clientCompanyRepository.findRelation(
      data.companyId,
      client.id,
    );
    if (relationExists)
      throw new ConflictException(
        'The relation between the company and the client it already exists',
      );

    const clientCompany = new ClientCompany({
      clientId: client.id,
      companyId: data.companyId,
      email: data.email ?? undefined,
      phone: data.phone ?? undefined,
    });

    await this.clientCompanyRepository.save(clientCompany);
  }
}
