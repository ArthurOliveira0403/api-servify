export abstract class UpdateCompanyDTO {
  name?: string;
  cnpj?: string;
  address?: {
    country?: string;
    state?: string;
    city?: string;
    street?: string;
    number?: string;
    zipCode?: string;
    complement?: string;
  };
  phoneNumber?: string;
}
