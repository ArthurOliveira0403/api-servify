export abstract class PdfServiceDTO {
  companyName: string;
  companyCnpj: string;
  companyPhone?: string;

  clientName: string;
  clientInternationalId: string;
  clientPhone?: string;

  serviceExecutionId: string;
  serviceName: string;
  serviceDescription: string;

  executedAt: string;
  price: number;

  invoiceNumber: string;

  issuedAt: string;

  timezone: string;
}
export const PDF_SERVICE = 'PDF_SERVICE';

export interface PdfService {
  generate(template: string, data: PdfServiceDTO): Promise<Buffer>;
}
