import z from 'zod';

export const updatePlanBodySchema = z.object({
  name: z.string().min(2).max(30).optional(),
  type: z.enum(['MONTHLY', 'YEARLY']).optional(),
  price: z.number().optional(),
  description: z.string().optional(),
});

export const updatePlanParamSchema = z.string();

export type UpdatePlanBodyDTO = z.infer<typeof updatePlanBodySchema>;

export type UpdatePlanParamDTO = z.infer<typeof updatePlanParamSchema>;
