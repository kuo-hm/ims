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
  dateOfBirth: Date;
  phoneNumber?: string;
  address?: Address;
}

export const registerPersonalInformationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),

  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  dateOfBirth: z.date().refine((date) => !isNaN(date.getTime()), {
    message: 'Invalid date of birth',
  }),
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
      },
    ),
});

export const registerSecuritySchema = z
  .object({
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm password must be at least 6 characters' }),
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

export const registerAddressSchema = z.object({
  street: z.string().min(1, { message: 'Street address is required' }).optional(),
  city: z.string().min(1, { message: 'City is required' }).optional(),
  state: z.string().min(1, { message: 'State is required' }).optional(),
  postalCode: z.string().min(1, { message: 'Postal code is required' }).optional(),
  country: z.string().min(1, { message: 'Country is required' }).optional(),
});

export type RegisterPersonalInformation = z.infer<typeof registerPersonalInformationSchema>;
export type RegisterSecurity = z.infer<typeof registerSecuritySchema>;
export type RegisterAddress = z.infer<typeof registerAddressSchema>;
