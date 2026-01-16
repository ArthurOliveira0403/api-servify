import z from 'zod';

export const updateClientCompanyBodySchema = z.object({
  email: z.string().optional(),
  phone: z.string().optional(),
});

export const updateClientCompanyParamSchema = z.string();

export type UpdateClientCompanyBodyDTO = z.infer<
  typeof updateClientCompanyBodySchema
>;

export type UpdateClientCompanyParamDTO = z.infer<
  typeof updateClientCompanyParamSchema
>;
