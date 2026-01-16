import z from 'zod';

export const createServiceExecutionBodySchema = z.object({
  serviceId: z.string(),
  clientCompanyId: z.string(),
  executedAt: z.string(),
});

export type CreateServiceExecutionBodyDTO = z.infer<
  typeof createServiceExecutionBodySchema
>;
