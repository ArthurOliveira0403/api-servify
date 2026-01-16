import z from 'zod';

export const signInBodySchema = z.object({
  email: z.email(),
  password: z.string().min(4).max(30),
});

export type SignInBodyDTO = z.infer<typeof signInBodySchema>;
