import { z } from 'zod';

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface SignUpInput {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber?: string;
  address?: Address;
}

export const registerSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm password must be at least 6 characters' }),
    username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    dateOfBirth: z.string().refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime()) && date <= new Date();
      },
      {
        message: 'Date of birth must be a valid date in the past',
      }
    ),
    phoneNumber: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true; // If phone number is not provided, it's valid
          const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
          return phoneRegex.test(val);
        },
        {
          message: 'Phone number must be a valid E.164 format',
        }
      ),
    address: z
      .object({
        street: z.string().min(1, { message: 'Street address is required' }),
        city: z.string().min(1, { message: 'City is required' }),
        state: z.string().min(1, { message: 'State is required' }),
        postalCode: z.string().min(1, { message: 'Postal code is required' }),
        country: z.string().min(1, { message: 'Country is required' }),
      })
      .optional(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
