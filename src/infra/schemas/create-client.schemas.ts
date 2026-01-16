import z from 'zod';

export const createClientBodySchema = z.object({
  fullName: z.string().min(2).max(100),
  internationalId: z.string(),
});

export type CreateClientBodyDTO = z.infer<typeof createClientBodySchema>;
