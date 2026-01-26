import z from 'zod';

export const generateInvoicePdfParamSchema = z.string();

export type GenerateInvoicePdfParamDTO = z.infer<
  typeof generateInvoicePdfParamSchema
>;
