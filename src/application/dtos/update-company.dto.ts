export interface UpdateCompanyDTO {
  name?: string;
  cnpj?: string;
  address?: {
    country?: string;
    state?: string;
    city?: string;
    street?: string;
    number?: string;
    zip_code?: string;
    complement?: string;
  };
  phone_number?: string;
}
