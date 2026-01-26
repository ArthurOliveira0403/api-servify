export const INVOICE_PDF_STORAGE_SERVICE = 'INVOICE_PDF_STORAGE_SERVICE';

export interface InvoicePdfStorageService {
  save(invoiceId: string, invoiceNumber: string, file: Buffer): Promise<string>;
  get(filePath: string): Promise<Buffer>;
}
