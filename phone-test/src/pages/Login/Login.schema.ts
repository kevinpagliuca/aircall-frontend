import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  username: z
    .string()
    .nonempty(`Username is required`)
    .min(3, `Username must be at least 3 characters`),
  password: z
    .string()
    .nonempty(`Password is required`)
    .min(6, `Password must be at least 6 characters`)
});

export type LoginFormValues = z.infer<typeof formSchema>;

export const LoginFormResolver = zodResolver(formSchema);
