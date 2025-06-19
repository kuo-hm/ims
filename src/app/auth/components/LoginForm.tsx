'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchema } from '@/schema/auth/login';
import Link from 'next/link';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  };

  return (
    <div className="relative z-10 w-full max-w-md flex flex-col items-center justify-center min-h-[450px] bg-black/20 backdrop-blur-sm rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/60 backdrop-blur-sm"
          {...register('email')}
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/60 backdrop-blur-sm"
          {...register('password')}
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="w-full flex justify-between mt-6">
        <span className="text-gray-400">Don&apos;t have an account?</span>
        <Link className="text-blue-600 hover:underline font-semibold" href="/auth/register">
          Register
        </Link>
      </div>
    </div>
  );
};
