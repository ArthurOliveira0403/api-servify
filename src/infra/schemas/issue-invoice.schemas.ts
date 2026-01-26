import z from 'zod';

export const issueInvoiceParamSchema = z.string();

export type IssueInvoiceParamDTO = z.infer<typeof issueInvoiceParamSchema>;
