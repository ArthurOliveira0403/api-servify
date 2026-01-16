import z from 'zod';

export const updateServiceBodySchema = z.object({
  name: z.string().min(2).max(50).optional(),
  description: z.string().min(2).optional(),
  basePrice: z.number().min(0).optional(),
});

export const updateServiceParamSchema = z.string();

export type UpdateServiceBodyDTO = z.infer<typeof updateServiceBodySchema>;
export type UpdateServiceParamDTO = z.infer<typeof updateServiceParamSchema>;
