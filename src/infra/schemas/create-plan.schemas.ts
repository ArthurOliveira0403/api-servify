import z from 'zod';

export const createPlanBodySchema = z.object({
  name: z.string().min(2).max(30),
  type: z.enum(['MONTHLY', 'YEARLY']),
  price: z.number(),
  description: z.string(),
});

export type CreatePlanBodyDTO = z.infer<typeof createPlanBodySchema>;
