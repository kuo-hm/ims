'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchema } from '@/schema/auth/login';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { FaEnvelope, FaLock, FaArrowRight, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

export const LoginForm = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  };

  return (
    <div className="relative z-10 w-full max-w-md">
      <Card className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden p-0">
        <div className="relative p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <FaUser className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-white/70">Sign in to your account</p>
          </div>
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">Email Address</FormLabel>
                    <div className="relative group">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">Password</FormLabel>
                    <div className="relative group">
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Button
                        type="button"
                        tabIndex={-1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 focus:outline-none bg-transparent hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="relative w-full group py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <FaArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </Button>
            </form>
          </Form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/5 text-white/60 rounded-full">or</span>
            </div>
          </div>
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-white/70">
              <span>Don&apos;t have an account?</span>
              <Link
                className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition-colors duration-200"
                href="/auth/register"
              >
                Create one
              </Link>
            </div>
            <Link
              className="block text-white/60 hover:text-white/80 text-sm transition-colors duration-200"
              href="/auth/forgot-password"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};
