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

  executedAt: Date;
  price: number;

  issuedAt: Date;
}
export const PDF_SERVICE = 'PDF_SERVICE';

export interface PdfService {
  generate(template: string, data: PdfServiceDTO): Promise<Buffer>;
}
