import z from 'zod';

export const signInAdminBodySchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type SignInAdminBodyDTO = z.infer<typeof signInAdminBodySchema>;
