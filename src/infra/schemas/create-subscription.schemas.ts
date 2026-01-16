import z from 'zod';

export const createSubscriptionBodySchema = z.object({
  planId: z.string(),
});

export type CreateSubscriptionBodyDTO = z.infer<
  typeof createSubscriptionBodySchema
>;
