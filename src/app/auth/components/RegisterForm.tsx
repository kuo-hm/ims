'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterSchema } from '@/schema/auth/register';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    // handle registration logic here
    console.log(data);
  };

  return (
    <Card className="relative z-10 w-full max-w-2xl flex flex-col items-center justify-center min-h-[650px] bg-black/20 backdrop-blur-sm rounded-lg shadow-lg p-8">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-white">Register</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                {...register('username')}
              />
              {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                {...register('email')}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div>
              <Input
                type="text"
                placeholder="First Name"
                {...register('firstName')}
              />
              {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
            </div>
            <div>
              <Input
                type="text"
                placeholder="Last Name"
                {...register('lastName')}
              />
              {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
            </div>
            <div>
              <Input
                type="date"
                placeholder="Date of Birth"
                {...register('dateOfBirth')}
              />
              {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Phone Number (optional)"
                {...register('phoneNumber')}
              />
              {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                {...register('password')}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
            </div>
          </div>
          <fieldset className="border border-gray-300 rounded p-4 bg-white/40 mt-4">
            <legend className="text-gray-700 text-sm font-semibold">Address (optional)</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="Street"
                  {...register('address.street')}
                />
                {errors.address?.street && <span className="text-red-500 text-sm">{errors.address.street.message}</span>}
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="City"
                  {...register('address.city')}
                />
                {errors.address?.city && <span className="text-red-500 text-sm">{errors.address.city.message}</span>}
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="State"
                  {...register('address.state')}
                />
                {errors.address?.state && <span className="text-red-500 text-sm">{errors.address.state.message}</span>}
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Postal Code"
                  {...register('address.postalCode')}
                />
                {errors.address?.postalCode && <span className="text-red-500 text-sm">{errors.address.postalCode.message}</span>}
              </div>
              <div className="md:col-span-2">
                <Input
                  type="text"
                  placeholder="Country"
                  {...register('address.country')}
                />
                {errors.address?.country && <span className="text-red-500 text-sm">{errors.address.country.message}</span>}
              </div>
            </div>
          </fieldset>
          <Button
            type="submit"
            className="w-full mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>
        <div className="w-full flex justify-between mt-6">
          <span className="text-gray-400">Already have an account?</span>
          <Link className="text-blue-600 hover:underline font-semibold" href="/auth/login">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
