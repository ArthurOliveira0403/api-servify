import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PDF_SERVICE, type PdfService } from '../services/pdf.service';
import {
  INVOICE_REPOSITORY,
  type InvoiceRepository,
} from 'src/domain/repositories/invoice.repository';
import { GenerateInvoicePdfDTO } from '../dtos/generate-invoice-pdf.use-case';
import { DEFAULT_INVOICE_PDF_TEMPLATE } from 'src/shared/constants';
import {
  INVOICE_PDF_STORAGE_SERVICE,
  type InvoicePdfStorageService,
} from '../services/invoice-pdf-storage.service';

@Injectable()
export class GenerateInvoicePdfUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private invoiceRepository: InvoiceRepository,
    @Inject(PDF_SERVICE)
    private pdfService: PdfService,
    @Inject(INVOICE_PDF_STORAGE_SERVICE)
    private invoicePdfStorageService: InvoicePdfStorageService,
  ) {}

  async handle(data: GenerateInvoicePdfDTO): Promise<Buffer> {
    const invoice = await this.invoiceRepository.findById(data.invoiceId);
    if (!invoice) throw new NotFoundException('Invoice not found');

    if (invoice.companyCnpj !== data.companyCnpj)
      throw new UnauthorizedException(
        'The invoice does not belong to the User Company',
      );

    if (invoice.pfdPath) {
      const pdfAlreadyExist = await this.invoicePdfStorageService.get(
        invoice.pfdPath,
      );

      return pdfAlreadyExist;
    }

    const pdf = await this.pdfService.generate(DEFAULT_INVOICE_PDF_TEMPLATE, {
      companyName: invoice.companyName,
      companyCnpj: invoice.companyCnpj,
      companyPhone: invoice.companyPhone ?? '',
      clientName: invoice.clientName,
      clientInternationalId: invoice.clientInternationalId,
      clientPhone: invoice.clientPhone ?? '',
      serviceExecutionId: invoice.serviceExecutionId,
      serviceName: invoice.serviceName,
      serviceDescription: invoice.serviceDescription,
      price: invoice.price,
      executedAt: invoice.executedAt,
      invoiceNumber: invoice.invoiceNumber,
      issuedAt: invoice.issuedAt,
    });

    await this.invoicePdfStorageService.save(
      invoice.id,
      invoice.invoiceNumber,
      pdf,
    );

    return pdf;
  }
}
