import { z } from "zod";

export const baseSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email'),
  password: z.string()
    .min(10, 'Minimum 10 characters')
    .regex(/[A-Z]/, 'Must include 1 uppercase')
    .regex(/[a-z]/, 'Must include 1 lowercase')
    .regex(/[0-9]/, 'Must include 1 number')
    .regex(/[^a-zA-Z0-9]/, 'Must include 1 special character'),
  confirmPassword: z.string()
});

export const signUpSchema = baseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
);
