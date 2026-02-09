import z from 'zod';

export const listOneClientCompanySchemaParam = z.string();

export type ListOneClientCompanyParamDTO = z.infer<
  typeof listOneClientCompanySchemaParam
>;
