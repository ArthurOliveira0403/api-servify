import z from 'zod';

export const updateCompanyBodySchema = z.object({
  name: z.string().min(2).max(100).optional(),
  address: z
    .object({
      country: z.string().optional(),
      state: z.string().optional(),
      city: z.string().optional(),
      street: z.string().optional(),
      number: z.string().optional(),
      zipCode: z.string().optional(),
      complement: z.string().optional(),
    })
    .optional(),
  phoneNumber: z.string(),
});

export type UpdateCompanyBodyDTO = z.infer<typeof updateCompanyBodySchema>;
