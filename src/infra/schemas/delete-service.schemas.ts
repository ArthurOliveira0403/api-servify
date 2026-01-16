import z from 'zod';

export const deleteServiceParamSchema = z.string();

export type DeleteServiceParamDTO = z.infer<typeof deleteServiceParamSchema>;
