import z from 'zod';

export const createClientCompanyBodySchema = z.object({
  clientInternationalId: z.string(),
  email: z.email().optional(),
  phone: z.string().optional(),
});

export type CreateClientCompanyBodyDTO = z.infer<
  typeof createClientCompanyBodySchema
>;
