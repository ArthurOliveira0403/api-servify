import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { UpdateClientCompanyDTO } from '../dtos/update-client-company.dto';
import {
  CLIENT_COMPANY_REPOSITORY,
  type ClientCompanyRepository,
} from 'src/domain/repositories/client-company.repository';

@Injectable()
export class UpdateClientCompanyUseCase {
  constructor(
    @Inject(CLIENT_COMPANY_REPOSITORY)
    private clientCompanyRepository: ClientCompanyRepository,
  ) {}

  async handle(data: UpdateClientCompanyDTO): Promise<void> {
    const clientCompany = await this.clientCompanyRepository.findById(
      data.clientCompanyId,
    );
    if (!clientCompany) throw new NotFoundException('Client Company not found');

    if (clientCompany.companyId !== data.companyId)
      throw new UnauthorizedException('Update not allowed');

    clientCompany.updateDetails({
      email: data.email,
      phone: data.phone,
    });

    await this.clientCompanyRepository.update(clientCompany);
  }
}
