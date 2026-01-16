import z from 'zod';

export const cancelSubscriptionsParamSchema = z.string();

export type CancelSubscriptionParamDTO = z.infer<
  typeof cancelSubscriptionsParamSchema
>;
