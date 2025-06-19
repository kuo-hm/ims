import { CalendarWithInput } from '@/components/ui/calendar-with-input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterPersonalInformation, registerPersonalInformationSchema } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import {  useForm } from 'react-hook-form';
import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import { useRegisterContext } from '../../../app/auth/context/register.context';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/ui/phone-input';

export const PersonalInformationStep = () => {
  const { setPersonalInformation, nextStep, personalInformation } =
    useRegisterContext();
  const form = useForm<RegisterPersonalInformation>({
    resolver: zodResolver(registerPersonalInformationSchema),
    defaultValues: personalInformation || {},
  });

  const onSubmit = (data: RegisterPersonalInformation) => {
    setPersonalInformation(data);
    nextStep();
  };
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-6" >
        <div className="flex items-center space-x-2 mb-4">
          <FaUser className="w-4 h-4 text-white" />
          <h3 className="text-lg font-semibold text-white">Personal Information</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90">Username</FormLabel>
                <div className="relative group">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Choose a username"
                      className="pl-10 text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                </div>
                <FormMessage className="min-h-[20px]" />
              </FormItem>
            )}
          />
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
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                </div>
                <FormMessage className="min-h-[20px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90">First Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    className="text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="min-h-[20px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90">Last Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your last name"
                    className="text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="min-h-[20px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90">Date of Birth</FormLabel>
                <FormControl>
                  <CalendarWithInput className="text-gray-400" {...field} />
                </FormControl>
                <FormMessage className="min-h-[20px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90">Phone Number (Optional)</FormLabel>
                <div className="relative group">
                  <FormControl>
                    <PhoneInput
                      type="tel"
                      placeholder="Enter your phone number"
                      className="text-gray-400 !bg-transparent"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="min-h-[20px]" />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 gap-4">
        <Button type="submit" className='hover:bg-blue-600 bg-blue-500 text-white cursor-pointer'>
          Next
        </Button>
      </div>
    </form>
    </Form>
  );
};

