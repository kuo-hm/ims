import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage,Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterSecurity, registerSecuritySchema } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaCheckCircle, FaKey, FaLock } from 'react-icons/fa';
import { useRegisterContext } from '../../../app/auth/context/register.context';

export const SecurityStep = () => {
  const { setSecurityInformation, nextStep,previousStep,securityInformation  } =
    useRegisterContext();
  const form = useForm<RegisterSecurity>({
    resolver: zodResolver(registerSecuritySchema),
    defaultValues: securityInformation || {},
  });

  console.log('securityInformation', securityInformation);

  const onSubmit = (data: RegisterSecurity) => {
    setSecurityInformation(data);
    nextStep();
  };
  return (
    <Form  {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
       <div className="space-y-6" >
            <div className="flex items-center space-x-2 mb-4">
              <FaLock className="w-4 h-4 text-white" />
              <h3 className="text-lg font-semibold text-white">Security</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">Password</FormLabel>
                    <div className="relative group">
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Create a strong password"
                          className="pl-10 text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    </div>
                    <FormMessage className="min-h-[20px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">Confirm Password</FormLabel>
                    <div className="relative group">
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm your password"
                          className="pl-10 text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    </div>
                    <FormMessage className="min-h-[20px]" />
                  </FormItem>
                )}
              />
            </div>
          </div>

      <div className="flex justify-end pt-4 gap-4">

        <Button type="button" variant={'outline'} className='bg-transparent text-white cursor-pointer' onClick={previousStep}>
          Back
        </Button>
        <Button type="submit"  className='hover:bg-blue-600 bg-blue-500 text-white cursor-pointer'>
          Next
        </Button>

      </div>
    </form>
    </Form>

  );
};
