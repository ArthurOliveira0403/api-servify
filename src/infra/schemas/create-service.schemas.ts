import z from 'zod';

export const createServiceBodySchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2),
  basePrice: z.number().min(0),
});

export type CreateServiceBodyDTO = z.infer<typeof createServiceBodySchema>;
