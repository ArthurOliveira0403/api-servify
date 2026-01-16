import z from 'zod';

export const listOnePlanParamSchema = z.string();

export type ListOnePlanParamDTO = z.infer<typeof listOnePlanParamSchema>;
