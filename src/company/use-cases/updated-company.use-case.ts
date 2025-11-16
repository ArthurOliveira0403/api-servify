import { UpdatedCompanyDTO } from '../dtos/update-company.dto';
import { CompanyRepository } from '../repository/company.repository';

export class UpdatedCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  handle(data: UpdatedCompanyDTO) {
    console.log(data);
  }
}
