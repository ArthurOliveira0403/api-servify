import z from 'zod';

export const createClientCompanyBodySchema = z.object({
  fullName: z.string().min(2).max(100),
  internationalId: z.string(),
  email: z.email().optional(),
  phone: z.string().optional(),
});

export type CreateClientCompanyBodyDTO = z.infer<
  typeof createClientCompanyBodySchema
>;
